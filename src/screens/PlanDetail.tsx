import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomMap from '../components/CustomMap';

const PlanDetail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <CustomMap
          disableSelect={true}
          //   lineData={currentRouteStops?.map(routeStop => {
          //     return {
          //       latitude: routeStop.stop.lat,
          //       longitude: routeStop.stop.lon,
          //     };
          //   })}
          //   focusMarkers={focusMarkers}
        />
      </View>
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
});

export default PlanDetail;
