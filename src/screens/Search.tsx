import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {getNodeData, getStopData, getRouteData} from '../redux/actions/route';

const Search = () => {
  const dispatch = useDispatch();

  const onPressGetNodeData = () => {
    dispatch(getNodeData());
  };

  const onPressGetStopData = () => {
    dispatch(getStopData());
  };

  const onPressGetRouteData = () => {
    dispatch(getRouteData());
  };

  return (
    <View style={styles.container}>
      <Button title="get Node Data from Api" onPress={onPressGetNodeData} />
      <Button title="get Stop Data from Api" onPress={onPressGetStopData} />
      <Button title="get Route Data from Api" onPress={onPressGetRouteData} />
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

export default Search;
