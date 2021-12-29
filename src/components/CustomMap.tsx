import React, {useState} from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import MapView, {
  CalloutSubview,
  LatLng,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {centerOfHongKong} from '../constants/map';
import MapPin from './MapPin';

interface Props {
  useGoogleMap?: boolean;
  initialRegion?: Region;
  style?: StyleProp<ViewStyle>;
  setStartLocation?: (_: LatLng) => void;
  setEndLocation?: (_: LatLng) => void;
}

const CustomMap: React.FC<Props> = React.memo(props => {
  const {
    style,
    useGoogleMap,
    initialRegion = centerOfHongKong,
    setStartLocation,
    setEndLocation,
  } = props;

  const [currentSelection, setCurrentSelection] = useState<LatLng | undefined>(
    undefined,
  );

  const onSetStartLocation = (coord: LatLng) => {
    setCurrentSelection(undefined);
    if (setStartLocation) setStartLocation(coord);
  };

  const onSetEndLocation = (coord: LatLng) => {
    setCurrentSelection(undefined);
    if (setEndLocation) setEndLocation(coord);
  };

  return (
    <MapView
      provider={useGoogleMap ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      style={[styles.map, style]}
      initialRegion={initialRegion}
      onPress={e => {
        setCurrentSelection(e.nativeEvent.coordinate);
      }}>
      {currentSelection !== undefined && (
        <MapPin
          coordinate={currentSelection}
          setStartLocation={onSetStartLocation}
          setEndLocation={onSetEndLocation}
        />
      )}
    </MapView>
  );
});

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CustomMap;
