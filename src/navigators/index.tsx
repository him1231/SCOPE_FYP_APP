import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import RootStackNavigator from './RootStackNavigator';

const RootNavigator = () => (
  <NavigationContainer>
    <StatusBar animated={true} hidden={false} />
    <RootStackNavigator />
  </NavigationContainer>
);

export default RootNavigator;
