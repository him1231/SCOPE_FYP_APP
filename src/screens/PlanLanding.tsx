import {getDistance} from 'geolib';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {LatLng} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import LocationInput from '../components/LocationInput';
import CustomMap from '../components/CustomMap';
import Separator from '../components/Separator';
import Shadow from '../components/styles/Shadow';
import {
  selectNodeData,
  selectRouteData,
  selectStopData,
} from '../redux/selectors/route';
import {route} from '../utils/route';
import {merge} from 'lodash';
import {INodeData, PlanResult} from '../models/route';
import {humanWalkingSpeed} from '../constants/route';
import {savePlanResult} from '../redux/actions/route';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PlanStackParamList} from '../navigators/PlanStackNavigator';

const locationString = (location: LatLng) =>
  `lat:${location?.latitude.toFixed(3)}, 
  lon:${location?.longitude.toFixed(3)}`;

const PlanLanding = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const routeData = useSelector(selectRouteData);
  const stopData = useSelector(selectStopData);
  const nodeData = useSelector(selectNodeData);
  const [startLatLng, setStartLatLng] = useState<LatLng | undefined>(undefined);
  const [endLatLng, setEndLatLng] = useState<LatLng | undefined>(undefined);

  const onPressGo = () => {
    if (startLatLng !== undefined && endLatLng !== undefined) {
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

      for (let _ of [...Array(5)]) {
        const result: PlanResult = route(
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

      dispatch(savePlanResult(planResults));
      navigation.navigate('PlanResult');
    } else {
      // test();
    }
  };

  // const test = () => {
  //   const newNodeData = Object.fromEntries(
  //     new Map(
  //       Object.entries(nodeData).map(item => {
  //         const [nodeKey, nodeValue] = item;
  //         const test = Object.entries(nodeValue);
  //         const newTest = test.map(item => {
  //           const newItem: [string, number] = [
  //             item[0],
  //             item[1] * 1 + item[1] * 2 + item[1] * 3 + item[1] * 4,
  //           ];
  //           return newItem;
  //         });
  //         const entries = new Map(newTest);
  //         const obj = Object.fromEntries(entries);
  //         return [nodeKey, obj];
  //       }),
  //     ),
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <CustomMap
        setStartLocation={setStartLatLng}
        setEndLocation={setEndLatLng}
      />
      <LocationInput
        title="start"
        placeholder="select the start location"
        initValue={startLatLng ? locationString(startLatLng) : undefined}
      />
      <Separator />
      <LocationInput
        title="end"
        placeholder="select the end location"
        initValue={endLatLng ? locationString(endLatLng) : undefined}
      />

      <CustomButton
        style={[styles.circleButton, Shadow]}
        textStyle={styles.circleButtonText}
        text={'GO'}
        onPress={onPressGo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  circleButton: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    position: 'absolute',
    right: '5%',
    top: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  circleButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PlanLanding;
