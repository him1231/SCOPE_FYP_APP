import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingPage from '../screens/SettingPage';

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Setting" component={SettingPage} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
