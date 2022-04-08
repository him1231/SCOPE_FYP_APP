import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlanLanding from '../screens/PlanLanding';
import PlanResult from '../screens/PlanResult';
import {RouteLocation} from '../constants/map';
import PlanDetail from '../screens/PlanDetail';

export type PlanStackParamList = {
  PlanLanding: undefined;
  PlanResult: {
    startRouteLocation: RouteLocation;
    endRouteLocation: RouteLocation;
  };
  PlanDetail: undefined;
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
      <PlanStack.Screen
        name="PlanResult"
        component={PlanResult}
        options={{headerShown: false}}
      />
      <PlanStack.Screen
        name="PlanDetail"
        component={PlanDetail}
        options={() => ({
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'red'},
        })}
      />
    </PlanStack.Navigator>
  );
};

export default PlanStackNavigator;
