import commonStyles from '@app/styles/common.styles';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { IPayInputProps } from './ipay-input.interface';
import inputStyles from './ipay-input.style';

/**
 * A component to display and input text.
 * @param {IPayInputProps} props - The props for the IPayInput component.
 * @param {string} props.testID - Test ID for testing purposes.
 * @param {string} props.text - Text content to be displayed.
 * @param {object} [props.style] - Additional styles for the input component.
 * @param {number} [props.numberOfLines] - Number of lines for multiline input.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.autoCapitalize] - Auto capitalization behavior.
 * @param {boolean} [props.autoFocus] - Specifies whether the input should be focused when the component mounts.
 * @param {number} [props.maxLength] - Maximum length of the input text.
 * @param {boolean} [props.multiline] - Specifies whether the input can have multiple lines.
 * @param {string} [props.keyboardType] - Specifies the keyboard type for the input.
 * @param {function} [props.onChangeText] - Callback function invoked when the text input's text changes.
 * @param {function} [props.onSubmitEditing] - Callback function invoked when the input is submitted.
 * @param {function} [props.handleFocus] - Callback function invoked when the input is focused.
 * @param {function} [props.handleBlur] - Callback function invoked when the input is blurred.
 * @param {boolean} [props.editable=true] - Specifies whether the input is editable.
 * @param {boolean} [props.blurOnSubmit] - Specifies whether the input should lose focus when submitted.
 * @param {IPayInputProps} props - The props for the IPayInput component.
 * @param {string} props.testID - Test ID for testing purposes.
 * @param {string} props.text - Text content to be displayed.
 * @param {object} [props.style] - Additional styles for the input component.
 * @param {number} [props.numberOfLines] - Number of lines for multiline input.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.autoCapitalize] - Auto capitalization behavior.
 * @param {boolean} [props.autoFocus] - Specifies whether the input should be focused when the component mounts.
 * @param {number} [props.maxLength] - Maximum length of the input text.
 * @param {boolean} [props.multiline] - Specifies whether the input can have multiple lines.
 * @param {string} [props.keyboardType] - Specifies the keyboard type for the input.
 * @param {function} [props.onChangeText] - Callback function invoked when the text input's text changes.
 * @param {function} [props.onSubmitEditing] - Callback function invoked when the input is submitted.
 * @param {function} [props.handleFocus] - Callback function invoked when the input is focused.
 * @param {function} [props.handleBlur] - Callback function invoked when the input is blurred.
 * @param {boolean} [props.editable=true] - Specifies whether the input is editable.
 * @param {boolean} [props.blurOnSubmit] - Specifies whether the input should lose focus when submitted.
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
  blurOnSubmit
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
      blurOnSubmit={blurOnSubmit}
      blurOnSubmit={blurOnSubmit}
    />
  );
};

export default IPayInput;
