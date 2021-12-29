import React, {FC, memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import image from '../image';

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
      <View style={styles.pinContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPressAsStart}>
            <Text style={styles.buttonText}>start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressAsEnd}>
            <Text style={styles.buttonText}>end</Text>
          </TouchableOpacity>
        </View>
        <Image source={image.ICON.PIN} />
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  pinContainer: {},
  buttonContainer: {},
  button: {},
  buttonText: {},
});

export default MapPin;
