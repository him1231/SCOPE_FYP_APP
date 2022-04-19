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
  startLocation?: LatLng;
  endLocation?: LatLng;
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
    startLocation,
    endLocation,
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

  useEffect(() => {
    setStartCoord(startLocation);
  }, [startLocation]);

  useEffect(() => {
    setEndCoord(endLocation);
  }, [endLocation]);

  useEffect(() => {
    const markers: string[] = [];
    if (startCoord) markers.push('start');
    if (endCoord) markers.push('end');
    if (markers.length > 0) {
      mapRef?.fitToSuppliedMarkers(markers, {
        animated: true,
        edgePadding: {top: 250, left: 50, right: 50, bottom: 50},
      });
    }
  }, [startCoord, endCoord]);

  var mapRef: MapView | null = null;

  return (
    <MapView
      ref={ref => {
        mapRef = ref;
      }}
      userInterfaceStyle={'light'}
      provider={PROVIDER_GOOGLE} //useGoogleMap ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
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
      {startCoord !== undefined && (
        <Marker identifier={'start'} coordinate={startCoord} pinColor={'red'} />
      )}
      {endCoord !== undefined && (
        <Marker identifier={'end'} coordinate={endCoord} pinColor={'lime'} />
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
              // image={image.ICON.TRANSPARENT}
              // style={{
              //   backgroundColor: 'white',
              //   borderRadius: 8,
              //   borderWidth: 4,
              //   borderColor: `rgb(${255 * (1 - i / lineData.length)},
              //   ${255 * (i / lineData.length)},0)`,
              // }}
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
