import React, {FC, memo} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton: FC<Props> = memo(props => {
  const {text, textStyle, ...touchableOpacityProps} = props;
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
});

export default CustomButton;
