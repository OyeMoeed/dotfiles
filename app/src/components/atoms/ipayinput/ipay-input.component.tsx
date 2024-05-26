import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import inputStyles from './ipay-input.style';
import { IPayInputProps } from './ipay-input.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import commonStyles from '@app/styles/common.styles';

/**
 * A component to display and input text.
 * @param {IPayInputProps} props - The props for the RNTextInput component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayInput: React.FC<IPayInputProps> = ({
  testID,
  text,
  style,
  numberOfLines,
  placeholder,
  autoCapitalize,
  autoFocus,
  maxLength,
  multiline,
  keyboardType,
  onChangeText,
  onSubmitEditing,
  handleFocus,
  handleBlur,
  editable = true,
}: IPayInputProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = inputStyles(colors);
  return (
    <TextInput
      testID={`${testID}-input`}
      value={t(`${text}`)}
      numberOfLines={numberOfLines}
      style={[styles.textInputStyle, commonStyles.subHeadlineText, style]}
      placeholder={placeholder}
      placeholderTextColor={colors.natural.natural500}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      maxLength={maxLength}
      multiline={multiline}
      keyboardType={keyboardType}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChangeText={onChangeText}
      onSubmitEditing={() => onSubmitEditing && onSubmitEditing(text)}
      editable={editable}
    />

  );
};

export default IPayInput;
