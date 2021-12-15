import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Route from '../screens/Route';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Route"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Route" component={Route} />
      <Tab.Screen name="Plan" component={Settings} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
