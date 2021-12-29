import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import image from '../image';
import Separator from './Separator';
import Shadow from './styles/Shadow';

interface Props {
  initValue?: string;
  title?: string;
  icon?: ImageSourcePropType;
  placeholder?: string;
  onPress?: () => void;
  onValueChange?: (_: string) => void;
  onClearText?: () => void;
}

const CustomInput = React.memo((props: Props) => {
  const {
    initValue,
    title,
    icon,
    placeholder,
    onPress,
    onValueChange,
    onClearText,
  } = props;
  const textInputRef = useRef<TextInput>(null);
  const [value, setValue] = useState<string | undefined>(undefined);

  const onPressContainer = () => {
    textInputRef.current?.focus();
  };

  const onChangeText = (newValue: string) => {
    setValue(newValue);
    if (onValueChange !== undefined) onValueChange(newValue);
  };

  const onPressClearButton = () => {
    setValue(undefined);
    if (onValueChange !== undefined) onValueChange('');
    if (onClearText !== undefined) onClearText();
  };

  return (
    <TouchableOpacity
      style={[styles.container, Shadow]}
      activeOpacity={1}
      onPress={onPress ?? onPressContainer}>
      {icon && <Image style={styles.icon} source={icon} />}
      {title && <Text style={styles.title}>{title}</Text>}
      {/* {title && <Separator />} */}
      <TextInput
        defaultValue={initValue}
        editable={onPress === undefined}
        ref={textInputRef}
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {value !== undefined && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onPressClearButton}>
          <Image style={styles.icon} source={image.ICON.CLEAR} />
        </TouchableOpacity>
      )}
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
  },
  title: {
    width: 35,
    marginLeft: 20,
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  clearButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
});

export default CustomInput;
