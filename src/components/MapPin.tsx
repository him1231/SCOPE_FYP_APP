import React, {FC, memo} from 'react';
import {Button, StyleSheet} from 'react-native';
import {Callout, LatLng, Marker} from 'react-native-maps';

interface Props {
  coordinate: LatLng;
  setStartLocation?: (_: LatLng) => void;
  setEndLocation?: (_: LatLng) => void;
}

const MapPin: FC<Props> = memo(props => {
  const {coordinate, setStartLocation, setEndLocation} = props;

  const onPressAsStart = () => {
    if (setStartLocation) setStartLocation(coordinate);
  };
  const onPressAsEnd = () => {
    if (setEndLocation) setEndLocation(coordinate);
  };
  return (
    <Marker coordinate={coordinate} tracksViewChanges={false}>
      <Callout>
        <Button title="As Start" onPress={onPressAsStart} />
        <Button title="As End" onPress={onPressAsEnd} />
      </Callout>
    </Marker>
  );
});

export default MapPin;
