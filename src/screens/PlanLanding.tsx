import {getDistance} from 'geolib';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {LatLng} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomMap from '../components/CustomMap';
import Separator from '../components/Separator';
import Shadow from '../components/styles/Shadow';
import {
  selectNodeData,
  selectRouteData,
  selectStopData,
} from '../redux/selectors/route';
import {merge} from 'lodash';
import {INodeData, PlanResult} from '../models/route';
import {humanWalkingSpeed} from '../constants/route';
import {savePlanResult} from '../redux/actions/route';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PlanStackParamList} from '../navigators/PlanStackNavigator';
import image from '../image';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {RouteLocation} from '../constants/map';

navigator.geolocation = require('@react-native-community/geolocation');

const locationString = (location: LatLng) =>
  `lat:${location?.latitude.toFixed(3)}, 
  lon:${location?.longitude.toFixed(3)}`;

const PlanLanding = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  // const routeData = useSelector(selectRouteData);
  // const stopData = useSelector(selectStopData);
  // const nodeData = useSelector(selectNodeData);
  // const [startLatLng, setStartLatLng] = useState<LatLng | undefined>(undefined);
  // const [endLatLng, setEndLatLng] = useState<LatLng | undefined>(undefined);
  const [startRouteLocation, setStartRouteLocation] = useState<
    RouteLocation | undefined
  >(undefined);
  const [endRouteLocation, setEndRouteLocation] = useState<
    RouteLocation | undefined
  >(undefined);

  const [shouldShowSearchScreen, setShouldShowSearchScreen] = useState<
    'start' | 'end' | false
  >(false);

  const onPressGo = () => {
    if (startRouteLocation !== undefined && endRouteLocation !== undefined) {
      navigation.navigate('PlanResult', {
        startRouteLocation: startRouteLocation,
        endRouteLocation: endRouteLocation,
      });
    } else {
      Alert.alert('Missing Location');
    }
  };

  const SearchScreen = () => {
    return (
      <SafeAreaView style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setShouldShowSearchScreen(false);
            if (details) {
              const routeLocation = {
                description: data.description ?? 'Current Location',
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              };
              setTimeout(() => {
                switch (shouldShowSearchScreen) {
                  case 'start':
                    setStartRouteLocation(routeLocation);
                    break;
                  case 'end':
                    setEndRouteLocation(routeLocation);
                    break;
                }
              }, 100);
            } else {
              Alert.alert('Location undefined');
            }
          }}
          onFail={error => {
            console.log('onFail error', error);
          }}
          onNotFound={() => {
            console.log('onNotFound');
          }}
          onTimeout={() => {
            console.log('onTimeout');
          }}
          query={{
            key: 'AIzaSyANH0uHnyZLiNFDKH9T0_S4aRVcgpnFCBI',
            language: 'en',
            components: 'country:hk',
          }}
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          currentLocation={true}
          currentLocationLabel="Current location"
        />
      </SafeAreaView>
    );
  };

  const onPickStartFromMap = (location: LatLng) => {
    setStartRouteLocation({
      description: 'Selected Start Location',
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const onPickEndFromMap = (location: LatLng) => {
    setEndRouteLocation({
      description: 'Selected End Location',
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CustomMap
          startLocation={startRouteLocation}
          endLocation={endRouteLocation}
          setStartLocation={onPickStartFromMap}
          setEndLocation={onPickEndFromMap}
        />
        <Separator />

        <CustomInput
          iconStyle={{tintColor: 'red'}}
          icon={image.ICON.CIRCLE}
          title="start:"
          placeholder="select the start location"
          initValue={
            startRouteLocation ? startRouteLocation.description : undefined
          }
          onPress={() => {
            setShouldShowSearchScreen('start');
          }}
        />
        <Separator />
        <CustomInput
          iconStyle={{tintColor: 'lime'}}
          icon={image.ICON.CIRCLE}
          title="end:"
          placeholder="select the end location"
          initValue={
            endRouteLocation ? endRouteLocation.description : undefined
          }
          onPress={() => {
            setShouldShowSearchScreen('end');
          }}
        />

        <CustomButton
          style={[styles.circleButton, Shadow]}
          textStyle={styles.circleButtonText}
          text={'GO'}
          onPress={onPressGo}
        />
      </SafeAreaView>
      {shouldShowSearchScreen && <SearchScreen />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: 'grey',
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

export default PlanLanding;
