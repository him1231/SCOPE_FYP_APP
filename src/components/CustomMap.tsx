import React, {useState} from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import MapView, {
  Polyline,
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

  const [startCoord, setStartCoord] = useState<LatLng | undefined>(undefined);

  const [endCoord, setEndCoord] = useState<LatLng | undefined>(undefined);

  const onSetStartLocation = (coord: LatLng) => {
    setCurrentSelection(undefined);
    if (setStartLocation) setStartLocation(coord);
    setStartCoord(coord);
  };

  const onSetEndLocation = (coord: LatLng) => {
    setCurrentSelection(undefined);
    if (setEndLocation) setEndLocation(coord);
    setEndCoord(coord);
  };

  return (
    <MapView
      userInterfaceStyle={'light'}
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
      {startCoord !== undefined && <Marker coordinate={startCoord} />}
      {endCoord !== undefined && (
        <Marker coordinate={endCoord} pinColor={'lime'} />
      )}
      {startCoord && endCoord && (
        <Polyline coordinates={[startCoord, endCoord]} lineDashPattern={[5]} />
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
