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
        <Image style={styles.pin} source={image.ICON.PIN} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPressAsStart}>
            <Text style={styles.buttonText}>start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressAsEnd}>
            <Text style={styles.buttonText}>end</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  pinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 7,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    margin: 7,
    marginBottom: 0,
    padding: 2,
    borderRadius: 2,
  },
  buttonText: {},
  pin: {position: 'absolute', bottom: 45, tintColor: 'white'},
});

export default MapPin;
