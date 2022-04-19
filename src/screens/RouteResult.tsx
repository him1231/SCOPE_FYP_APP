import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getKmbEtaDataFromApi} from '../api/eta';
import {getRouteStopDataFromServer} from '../api/route';
import CustomMap from '../components/CustomMap';
import {IEtaApiData} from '../models/eta';
import {IRouteStopFromServer} from '../models/route';
import {RootStackParamList} from '../navigators/RootStackNavigator';
import image from '../image';

const RouteResult = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'RouteResult'>>();
  const {routeData} = route.params;

  const [routeStopsData, setRouteStopsData] = useState<
    IRouteStopFromServer[] | undefined
  >(undefined);

  const [etaData, setEtaData] = useState<IEtaApiData[] | undefined>(undefined);

  const [currentBound, setCurrentBound] = useState<string>('1');

  const [currentRouteStops, setCurrentRouteStops] = useState<
    IRouteStopFromServer[] | undefined
  >(undefined);

  const [currentEtaData, setCurrentEtaData] = useState<
    IEtaApiData[] | undefined
  >(undefined);

  const [focusMarkers, setFocusMarkers] = useState<string[]>([]);

  const [shouldReverse, setShouldReverse] = useState(false);

  useEffect(() => {
    if (etaData) {
      setCurrentEtaData(
        etaData.filter(data => data.dir === (currentBound === '1' ? 'O' : 'I')),
      );
    }
  }, [etaData, currentBound]);

  useEffect(() => {
    setCurrentRouteStops(
      routeStopsData
        ?.filter(routeStop => routeStop.bound === currentBound)
        .sort((a, b) => (a.seq > b.seq ? 1 : -1)),
    );
  }, [routeStopsData, currentBound]);

  useEffect(() => {
    if (currentRouteStops) {
      setFocusMarkers(currentRouteStops.map((_, i) => `${i}`));
    }
  }, [currentRouteStops]);

  useEffect(() => {
    var refreshIntervalId: NodeJS.Timer;

    if (routeData !== undefined) {
      navigation.setOptions({
        title: routeData.name_en,
        headerRight: () => (
          <TouchableOpacity onPress={reverse}>
            <Image
              source={image.ICON.REVERSE}
              style={{tintColor: 'white', height: 24, width: 24}}
            />
          </TouchableOpacity>
        ),
      });
      getRouteStopData(routeData.route);
      if (routeData.name_en) {
        getEtaData(routeData.name_en ?? '', routeData.service_type);
        refreshIntervalId = setInterval(() => {
          getEtaData(routeData.name_en ?? '', routeData.service_type);
        }, 30000);
      }
    }
    return () => {
      clearInterval(refreshIntervalId);
    };
  }, []);

  useEffect(() => {
    if (shouldReverse) {
      setShouldReverse(false);
      setCurrentBound(currentBound === '1' ? '2' : '1');
    }
  }, [shouldReverse]);

  const reverse = () => {
    setShouldReverse(true);
  };

  const getRouteStopData = async (route: string) => {
    const json = await getRouteStopDataFromServer(route);
    setRouteStopsData(json.data);
  };

  const getEtaData = async (route: string, service_type: string | number) => {
    const json = await getKmbEtaDataFromApi(route, service_type);
    setEtaData(json.data);
  };

  const stopItem = ({
    item,
    index,
  }: {
    item: IRouteStopFromServer;
    index: number;
  }) => {
    const length = currentRouteStops?.length ?? 1;
    const color = `rgb(${255 * (1 - index / length)},
    ${255 * (index / length)},0)`;

    const eta = currentEtaData?.find(eta => eta.seq === index + 1);

    let etaTime: Date | undefined = undefined;
    let etaMins = 0;

    var timestamp = Date.parse(eta?.eta ?? '');
    if (eta?.eta && isNaN(timestamp) == false) {
      etaTime = new Date(eta?.eta);
      var diff = Math.round(etaTime.getTime() - new Date().getTime());
      etaMins = Math.round(diff / 1000 / 60);
    }

    return (
      <TouchableOpacity
        style={styles.stopItem}
        onPress={() => {
          setFocusMarkers([`${index}`]);
        }}>
        <View style={styles.upperLineContainer}>
          <View
            style={[
              styles.stopLine,
              {backgroundColor: index === 0 ? 'transparent' : color},
            ]}
          />
        </View>
        <View style={styles.itemContentContainer}>
          <View>
            <View
              style={[
                styles.shortStopLine,
                {backgroundColor: index === 0 ? 'transparent' : color},
              ]}
            />
            <View style={[styles.circle, {backgroundColor: color}]}>
              <View style={styles.dot} />
            </View>
            <View
              style={[
                styles.shortStopLine,
                {
                  backgroundColor: index === length - 1 ? 'transparent' : color,
                },
              ]}
            />
          </View>
          <Text numberOfLines={1}>{item.stop.name}</Text>
        </View>
        <View style={styles.lowerLineContainer}>
          <View
            style={[
              styles.stopLine,
              {
                backgroundColor: index === length - 1 ? 'transparent' : color,
              },
            ]}
          />
          <View>
            <Text>{`  eta: ${etaMins < 0 ? '-' : etaMins}`}</Text>
            {/* <Text>{`( ${etaTime} )`}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <CustomMap
          disableSelect={true}
          lineData={currentRouteStops?.map(routeStop => {
            return {
              latitude: routeStop.stop.lat,
              longitude: routeStop.stop.lon,
            };
          })}
          focusMarkers={focusMarkers}
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={currentRouteStops}
        renderItem={stopItem}
        keyExtractor={(_, i) => `${i}`}
        contentContainerStyle={{paddingBottom: 30}}
        extraData={etaData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  mapContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
  },
  flatList: {width: '100%'},
  stopItem: {
    // flexDirection: 'row',
  },
  stopLineContainer: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  stopInfo: {
    justifyContent: 'center',
  },
  stopLine: {
    marginHorizontal: 9,
    width: 6,
    minHeight: 12,
  },
  shortStopLine: {
    marginHorizontal: 9,
    width: 6,
    minHeight: 2,
    flex: 1,
  },
  circle: {
    marginHorizontal: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  upperLineContainer: {flexDirection: 'row'},
  itemContentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lowerLineContainer: {flexDirection: 'row'},
});

export default RouteResult;
