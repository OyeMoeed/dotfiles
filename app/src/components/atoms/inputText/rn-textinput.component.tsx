import React from 'react';
import { TextInput } from 'react-native';
import { RNTextInputProps } from './rn-textinput.interface';
import styles from './rn-textinput.style';

/**
 * A component to display and input text.
 * @param {RNTextInputProps} props - The props for the RNTextInput component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNTextInput: React.FC<RNTextInputProps> = ({
  testID,
  text,
  style,
  numberOfLines,
  placeholder,
  placeholderTextColor,
  editable,
  autoCapitalize,
  autoComplete,
  autoFocus,
  inputMode,
  maxLength,
  multiline,
  keyboardType,
  readOnly,
  onBlur,
  onChangeText,
  onPressIn,
  onPressOut,
  onFocus,
  onSubmitEditing
}: RNTextInputProps): JSX.Element => {
  return (
    <TextInput
      testID={testID}
      value={text}
      numberOfLines={numberOfLines}
      style={[styles.textInputStyle, style]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      editable={editable}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      inputMode={inputMode}
      maxLength={maxLength}
      multiline={multiline}
      keyboardType={keyboardType}
      readOnly={readOnly}
      onBlur={onBlur}
      onChangeText={onChangeText}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onFocus={onFocus}
      onSubmitEditing={() => onSubmitEditing && onSubmitEditing(text)}
    />
  );
};

export default RNTextInput;
