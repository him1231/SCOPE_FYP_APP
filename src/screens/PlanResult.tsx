import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {getDistance} from 'geolib';
import {merge} from 'immutable';
import {random} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import {LatLng} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import CustomInput from '../components/CustomInput';
import Separator from '../components/Separator';
import Shadow from '../components/styles/Shadow';
import {RouteLocation} from '../constants/map';
import {humanWalkingSpeed} from '../constants/route';
import image from '../image';
import {INodeData, PlanResult} from '../models/route';
import {PlanStackParamList} from '../navigators/PlanStackNavigator';
import {asyncRoutePlanning} from '../redux/actions/route';
import {
  selectNodeData,
  selectPlanResult,
  selectRouteData,
  selectStopData,
} from '../redux/selectors/route';
import {routePlanning} from '../utils/routePlanning';

const RouteResult = () => {
  const dispatch = useDispatch();

  // const data = useSelector(selectPlanResult);
  const routeData = useSelector(selectRouteData);
  const stopData = useSelector(selectStopData);
  const nodeData = useSelector(selectNodeData);

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();
  const route = useRoute<RouteProp<PlanStackParamList, 'PlanResult'>>();
  const params = route.params;

  const [startPlaceData, setStartPlaceData] = useState(
    params.startRouteLocation,
  );
  const [endPlaceData, setEndPlaceData] = useState(params.endRouteLocation);

  const [planResult, setPlanResult] = useState<PlanResult[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (startPlaceData && endPlaceData && planResult === undefined) {
      // getRoutePlanningResult(startPlaceData, endPlaceData);
      dispatch(asyncRoutePlanning(startPlaceData, endPlaceData));
    }
  }, [planResult]);

  const getRoutePlanningResult = (
    startLatLng: RouteLocation,
    endLatLng: RouteLocation,
  ) => {
    console.log('start route @ ', new Date());

    const newNoteData: INodeData = {start: {}, end: {}};

    const startCoord = {
      lat: startLatLng.latitude,
      lon: startLatLng.longitude,
    };
    const endCoord = {lat: endLatLng.latitude, lon: endLatLng.longitude};

    stopData.forEach(stop => {
      const stopCoord = {lat: stop.lat, lon: stop.long};
      const startDistance = getDistance(startCoord, stopCoord);
      if (startDistance < 300) {
        newNoteData['start'][stop.stop] =
          (startDistance / 1000 / humanWalkingSpeed) * 60;
      }

      const endDistance = getDistance(stopCoord, endCoord);
      if (endDistance < 300) {
        newNoteData[stop.stop] = {};
        newNoteData[stop.stop]['end'] =
          (endDistance / 1000 / humanWalkingSpeed) * 60;
      }
    });

    const avoidCarList = routeData
      .filter(item => item.name_sc?.startsWith('N'))
      .map(item => item.route);

    const avoidList: string[] = [
      ...Object.keys(nodeData).filter(item =>
        avoidCarList.some(car => item.startsWith(car + '-')),
      ),
    ];

    const planResults: PlanResult[] = [];

    for (let _ of [...Array(3)]) {
      const result: PlanResult = routePlanning(
        merge(JSON.parse(JSON.stringify(nodeData)), newNoteData),
        'start',
        'end',
        avoidList,
      );

      if (result.path !== null) {
        planResults.push(result);
        const car = result.path.find(item => item.split('-').length === 3);
        if (car) {
          const avoidCarList = Object.keys(nodeData).filter(key =>
            key.startsWith(car.split('-')[0] + '-'),
          );

          avoidList.push(...avoidCarList);
        }
      } else {
        break;
      }
    }

    setPlanResult(planResults);
    console.log('end route @ ', new Date());

    // dispatch(savePlanResult(planResults));
  };

  const renderItem = ({item}: {item: PlanResult}) => {
    type IconItem = {text?: string; image: ImageSourcePropType};

    const planIconData: IconItem[] = [];
    let lastRouteData: string[] | undefined = undefined;

    item.path.forEach(path => {
      if (path === 'start') {
        planIconData.push({text: 'start', image: image.TRANSPORT_ICON.START});
      } else if (path === 'end') {
        planIconData.push({text: 'end', image: image.TRANSPORT_ICON.END});
      } else {
        const pathData = path.split('-');
        if (pathData.length === 1) {
          if (
            planIconData[planIconData.length - 1].image !==
            image.TRANSPORT_ICON.WALK
          )
            planIconData.push({text: '', image: image.TRANSPORT_ICON.WALK});
        } else {
          if (lastRouteData && lastRouteData[0] !== pathData[0]) {
            planIconData.push({
              text: routeData.find(data => data.route === pathData[0])?.name_en,
              image: image.TRANSPORT_ICON.BUS,
            });
          }
        }

        lastRouteData = pathData;
      }
    });

    const iconItem = ({item}: {item: IconItem}) => {
      return (
        <View
          style={{
            maxWidth: 30,
            height: 40,
            alignItems: 'center',
          }}>
          <Image
            style={{width: item ? 25 : 15, height: 25}}
            source={item ? item.image : image.TRANSPORT_ICON.NEXT}
          />
          {item && <Text>{item.text}</Text>}
        </View>
      );
    };

    return (
      <TouchableOpacity
        style={[styles.item, Shadow]}
        onPress={() => {
          navigation.navigate('PlanDetail');
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{`time: ${item.cost.toFixed(1)} mins`}</Text>
          <Text>{`fare: ${(random(true) * 10).toFixed(1)} mins`}</Text>
          <Text>{`walk: ${(random(true) * 10).toFixed(1)} mins`}</Text>
        </View>
        <FlatList
          data={planIconData}
          horizontal={true}
          renderItem={iconItem}
          ItemSeparatorComponent={iconItem}
          keyExtractor={(_, i) => `${i}`}
          contentContainerStyle={{paddingTop: 20}}
        />
      </TouchableOpacity>
    );
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const reverse = () => {
    setStartPlaceData(endPlaceData);
    setEndPlaceData(startPlaceData);
    setPlanResult(undefined);
  };

  const Header = () => {
    return (
      <SafeAreaView
        style={styles.headerContainer}
        edges={['right', 'top', 'left']}>
        <TouchableOpacity style={styles.headerButton} onPress={goBack}>
          <Image style={styles.headerButtonIcon} source={image.ICON.BACK} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Separator />
          <CustomInput
            style={{width: undefined}}
            iconStyle={{tintColor: 'red'}}
            icon={image.ICON.CIRCLE}
            title="start:"
            initValue={startPlaceData.description}
            onPress={() => {}}
          />
          <Separator />
          <CustomInput
            style={{width: undefined}}
            iconStyle={{tintColor: 'lime'}}
            icon={image.ICON.CIRCLE}
            title="end:"
            initValue={endPlaceData.description}
            onPress={() => {}}
          />
          <Separator />
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={reverse}>
          <Image style={styles.headerButtonIcon} source={image.ICON.REVERSE} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <>
      <Header />
      <FlatList
        data={planResult}
        renderItem={renderItem}
        keyExtractor={(_, i) => `${i}`}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <Separator size={20} />}
        extraData={planResult}
        ListEmptyComponent={() =>
          planResult === undefined ? <ActivityIndicator /> : <></>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  headerButton: {
    justifyContent: 'center',
    padding: 10,
  },
  headerButtonIcon: {tintColor: 'white', width: 20, height: 20},
  headerContent: {flex: 1, alignItems: 'center'},
});

export default RouteResult;
