import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabNavigator from './HomeTabNavigator';
import RouteResult from '../screens/RouteResult';
import {IRoute} from '../models/route';

export type RootStackParamList = {
  Home: undefined;
  RouteResult: {routeData?: IRoute};
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
      <RootStack.Screen
        name="RouteResult"
        component={RouteResult}
        options={() => ({
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'red'},
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
