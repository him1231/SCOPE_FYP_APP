import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabNavigator from './HomeTabNavigator';

export type RootStackParamList = {
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

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
