import React, {useEffect, useState} from 'react';
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
import image from '../image';
import MapPin from './MapPin';

interface Props {
  useGoogleMap?: boolean;
  initialRegion?: Region;
  style?: StyleProp<ViewStyle>;
  setStartLocation?: (_: LatLng) => void;
  setEndLocation?: (_: LatLng) => void;
  disableSelect?: boolean;
  lineData?: LatLng[];
  focusMarkers?: string[];
}

const CustomMap: React.FC<Props> = React.memo(props => {
  const {
    style,
    useGoogleMap,
    initialRegion = centerOfHongKong,
    setStartLocation,
    setEndLocation,
    disableSelect,
    lineData,
    focusMarkers,
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

  useEffect(() => {
    if (focusMarkers) {
      mapRef?.fitToSuppliedMarkers(focusMarkers, {animated: true});
    }
  }, [focusMarkers]);

  var mapRef: MapView | null = null;

  return (
    <MapView
      ref={ref => {
        mapRef = ref;
      }}
      userInterfaceStyle={'light'}
      provider={useGoogleMap ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      style={[styles.map, style]}
      initialRegion={initialRegion}
      onPress={e => {
        if (!disableSelect) setCurrentSelection(e.nativeEvent.coordinate);
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

      {lineData && (
        <>
          <Polyline
            coordinates={lineData}
            strokeWidth={4}
            strokeColor={'red'}
            strokeColors={lineData.map(
              (_, i) =>
                `rgb(${255 * (1 - i / lineData.length)},
              ${255 * (i / lineData.length)},0)`,
            )}
            geodesic={true}
            tappable={true}
          />
          {lineData.map((data, i) => (
            <Marker
              key={i}
              image={image.ICON.TRANSPARENT}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 4,
                borderColor: `rgb(${255 * (1 - i / lineData.length)},
                ${255 * (i / lineData.length)},0)`,
              }}
              coordinate={data}
              identifier={`${i}`}
            />
          ))}
        </>
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
