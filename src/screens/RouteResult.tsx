import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {getRouteStopDataFromServer} from '../api/route';
import CustomMap from '../components/CustomMap';
import {IRouteStopFromServer} from '../models/route';
import {RootStackParamList} from '../navigators/RootStackNavigator';

const RouteResult = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'RouteResult'>>();
  const {routeData} = route.params;

  const [routeStopsData, setRouteStopsData] = useState<
    IRouteStopFromServer[] | undefined
  >(undefined);

  const [currentBound, setCurrentBound] = useState<string>('1');

  const [currentRouteStops, setCurrentRouteStops] = useState<
    IRouteStopFromServer[] | undefined
  >(undefined);

  const [focusMarkers, setFocusMarkers] = useState<string[]>([]);

  useEffect(() => {
    setCurrentRouteStops(
      routeStopsData?.filter(routeStop => routeStop.bound === currentBound),
    );
  }, [routeStopsData]);

  useEffect(() => {
    if (currentRouteStops) {
      setFocusMarkers(currentRouteStops.map((_, i) => `${i}`));
    }
  }, [currentRouteStops]);

  useEffect(() => {
    if (routeData) {
      navigation.setOptions({title: routeData?.name_en});
      getRouteStopData(routeData?.route);
    }
  }, []);

  const getRouteStopData = async (route: string) => {
    console.log('getRouteStopData start');

    const json = await getRouteStopDataFromServer(route);
    setRouteStopsData(json.data);
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

    return (
      <TouchableOpacity
        style={styles.stopItem}
        onPress={() => {
          setFocusMarkers([`${index}`]);
        }}>
        <View style={styles.stopLineContainer}>
          <View
            style={[
              styles.stopLine,
              {backgroundColor: index === 0 ? 'transparent' : color},
            ]}
          />
          <View style={[styles.circle, {backgroundColor: color}]}>
            <View style={styles.dot} />
          </View>
          <View
            style={[
              styles.stopLine,
              {
                backgroundColor: index === length - 1 ? 'transparent' : color,
              },
            ]}
          />
        </View>
        <View style={styles.stopInfo}>
          <Text numberOfLines={1}>{item.stop.name}</Text>
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
    flexDirection: 'row',
  },
  stopLineContainer: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  stopInfo: {
    justifyContent: 'center',
  },
  stopLine: {
    width: 6,
    height: 12,
  },
  circle: {
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
});

export default RouteResult;
