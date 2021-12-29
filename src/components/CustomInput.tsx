import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Separator from './Separator';
import Shadow from './styles/Shadow';

interface Props {
  initValue?: string;
  title?: string;
  icon?: ImageSourcePropType;
  placeholder?: string;
  onPress?: () => void;
  onValueChange?: (_: string) => void;
}

const CustomInput = React.memo((props: Props) => {
  const {initValue, title, icon, placeholder, onPress, onValueChange} = props;
  const textInputRef = useRef<TextInput>(null);

  const onPressContainer = () => {
    textInputRef.current?.focus();
  };

  return (
    <TouchableOpacity
      style={[styles.container, Shadow]}
      activeOpacity={1}
      onPress={onPress ?? onPressContainer}>
      {icon && <Image style={styles.icon} source={icon} />}
      {title && <Text>{title}</Text>}
      {title && <Separator />}
      <TextInput
        defaultValue={initValue}
        editable={onPress === undefined}
        ref={textInputRef}
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onValueChange}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
});

export default CustomInput;
