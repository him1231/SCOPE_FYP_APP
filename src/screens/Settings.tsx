import React, {useEffect} from 'react';
import Graph from 'node-dijkstra';
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
import {INodeData} from '../models/route';
import {Button, StyleSheet, View} from 'react-native';

const route = (node: INodeData, start: string, end: string) => {
  const route = new Graph(node);
  const result = route.path(start, end, {cost: true, avoid: []});
  return result;
};

const randomNubmer = (max: number) => Math.floor(Math.random() * max);

const Settings = () => {
  const dispatch = useDispatch();
  const stopData = useSelector(selectStopData);
  const routeStopData = useSelector(selectRouteStopData);
  const routeData = useSelector(selectRouteData);
  const nodeData = useSelector(selectNodeData);

  useEffect(() => {
    if (stopData.length === 0) {
      dispatch(getStopData());
    }
  }, [stopData]);

  useEffect(() => {
    if (routeStopData.length === 0) {
      dispatch(getRouteStopData());
    }
  }, [routeStopData]);

  useEffect(() => {
    if (routeData.length === 0) {
      dispatch(getRouteData());
    }
  }, [routeData]);

  useEffect(() => {
    if (
      stopData.length !== 0 &&
      routeStopData.length !== 0 &&
      Object.entries(nodeData).length === 0 &&
      true
    ) {
      dispatch(updateNodeData());
    }
  }, [stopData, routeStopData, nodeData]);

  const routePath = () => {
    const result = route(
      {...nodeData},
      stopData[randomNubmer(stopData.length)].stop,
      stopData[randomNubmer(stopData.length)].stop,
    );

    console.log('route path result', result);
  };

  return (
    <View style={styles.container}>
      <Button title="routePath" onPress={routePath} />
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
