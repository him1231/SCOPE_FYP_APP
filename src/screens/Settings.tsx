// import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   getRouteData,
//   getRouteStopData,
//   getStopData,
//   updateNodeData,
// } from '../redux/actions/route';
// import {
//   selectNodeData,
//   selectRouteData,
//   selectRouteStopData,
//   selectStopData,
// } from '../redux/selectors/route';
// import {Button, StyleSheet, View} from 'react-native';

// const randomNubmer = (max: number) => Math.floor(Math.random() * max);

// const Settings = () => {
//   const dispatch = useDispatch();

//   const getRawData = () => {
//     dispatch(getStopData());
//     dispatch(getRouteStopData());
//     dispatch(getRouteData());
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="get raw data" onPress={getRawData} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Settings;

import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {getNodeData, getStopData, getRouteData} from '../redux/actions/route';

const Setting = () => {
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

export default Setting;
