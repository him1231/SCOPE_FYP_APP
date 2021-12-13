import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingOverlay: React.FC<{}> = React.memo(() => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" style={styles.indicator} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  indicator: {
    padding: 16,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default LoadingOverlay;
