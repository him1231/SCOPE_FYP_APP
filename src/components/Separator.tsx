import React from 'react';
import {View} from 'react-native';

const Separator = ({size = 10}: {size?: number}) => {
  return <View style={{height: size, width: size}} />;
};

export default Separator;
