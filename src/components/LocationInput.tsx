import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Separator from './Separator';
import Shadow from './styles/Shadow';

interface Props {
  initValue?: string;
  title?: string;
  placeholder?: string;
  onPress?: () => void;
  onValueChange?: (_: string) => void;
}

const LocationInput = React.memo((props: Props) => {
  const {initValue, title, placeholder, onPress, onValueChange} = props;
  const textInputRef = useRef<TextInput>(null);

  const onPressContainer = () => {
    textInputRef.current?.focus();
  };

  return (
    <TouchableOpacity
      style={[styles.container, Shadow]}
      activeOpacity={1}
      onPress={onPress ?? onPressContainer}>
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
  textInput: {
    flex: 1,
  },
});

export default LocationInput;
