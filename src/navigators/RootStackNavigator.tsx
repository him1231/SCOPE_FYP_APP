import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabNavigator from './HomeTabNavigator';

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <RootStack.Screen name="Home" component={HomeTabNavigator} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
