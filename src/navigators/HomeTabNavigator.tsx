import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Search from '../screens/Search';
import PlanStackNavigator from './PlanStackNavigator';
import image from '../image';
import {Image} from 'react-native';

export type HomeTabParamList = {
  ROUTE: undefined;
  SEARCH: undefined;
  SETTING: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const TabBarIcon = (props: {
  focused: boolean;
  color: string;
  size: number;
  screen: keyof HomeTabParamList;
}) => {
  const {color, size, screen} = props;
  return (
    <Image
      style={{width: size, height: size, tintColor: color}}
      source={image.ICON[screen]}
    />
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: 'red',
      })}>
      <Tab.Screen
        name="ROUTE"
        component={PlanStackNavigator}
        options={{
          tabBarLabel: 'Route',
          tabBarIcon: props => <TabBarIcon screen={'ROUTE'} {...props} />,
        }}
      />
      <Tab.Screen
        name="SEARCH"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: props => <TabBarIcon screen={'SEARCH'} {...props} />,
        }}
      />
      <Tab.Screen
        name="SETTING"
        component={Settings}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: props => <TabBarIcon screen={'SETTING'} {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
