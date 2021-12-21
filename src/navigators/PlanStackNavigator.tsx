import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlanLanding from '../screens/PlanLanding';
import PlanResult from '../screens/PlanResult';

export type PlanStackParamList = {
  PlanLanding: undefined;
  PlanResult: undefined;
};

const PlanStack = createNativeStackNavigator<PlanStackParamList>();

const PlanStackNavigator = () => {
  return (
    <PlanStack.Navigator>
      <PlanStack.Screen
        name="PlanLanding"
        component={PlanLanding}
        options={{headerShown: false}}
      />
      <PlanStack.Screen name="PlanResult" component={PlanResult} />
    </PlanStack.Navigator>
  );
};

export default PlanStackNavigator;
