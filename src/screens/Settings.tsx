import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getRouteData,
  getRouteStopData,
  getStopData,
  updateNodeData,
} from '../redux/actions/route';
import {
  selectNodeData,
  selectRouteData,
  selectRouteStopData,
  selectStopData,
} from '../redux/selectors/route';
import {Button, StyleSheet, View} from 'react-native';

const randomNubmer = (max: number) => Math.floor(Math.random() * max);

const Settings = () => {
  const dispatch = useDispatch();

  const getRawData = () => {
    dispatch(getStopData());
    dispatch(getRouteStopData());
    dispatch(getRouteData());
  };

  return (
    <View style={styles.container}>
      <Button title="get raw data" onPress={getRawData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;
