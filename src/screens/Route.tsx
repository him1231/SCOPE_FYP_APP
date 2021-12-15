import {getDistance} from 'geolib';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {LatLng} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import LocationInput from '../components/LocationInput';
import Map from '../components/Map';
import Separator from '../components/Separator';
import Shadow from '../components/styles/Shadow';
import {selectNodeData, selectStopData} from '../redux/selectors/route';
import {route} from '../utils/route';
import _ from 'lodash';
import {INodeData} from '../models/route';
import {humanWalkingSpeed} from '../constants/route';

const locationString = (location: LatLng) =>
  `lat:${location?.latitude.toFixed(3)}, 
  lon:${location?.longitude.toFixed(3)}`;

const Route = () => {
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

      const avoidList: string[] = [];

      [...Array(5)].forEach((item, index) => {
        const result = route(
          _.merge(nodeData, newNoteData),
          'start',
          'end',
          avoidList,
        );

        console.log('route result', index, result);

        avoidList.push(result.path[result.path.length - 2]);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map setStartLocation={setStartLatLng} setEndLocation={setEndLatLng} />
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

export default Route;
