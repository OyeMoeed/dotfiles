import { ReactElement } from 'react';
import { KeyboardTypeOptions, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface AnimatedTextInputProps extends TextInputProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * Unique identifier for the input field.
   */
  text?: string;
  /**
   * Style for the text input.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Maximum number of lines to show. If undefined, a single line input is rendered.
   */
  numberOfLines?: number;
  /**
   * Placeholder text displayed when the input is empty.
   */
  placeholder?: string;
  /**
   * Color of the placeholder text.
   */
  placeholderTextColor?: string;
  /**
   * If false, the input field is disabled and cannot be edited.
   */
  editable?: boolean;
  /**
   * Determines how the text is capitalized.
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

  /**
   * Maximum length of the entered text.
   */
  maxLength?: number;
  /**
   * If true, the input field can contain multiple lines of text.
   */
  multiline?: boolean;
  /**
   * The type of keyboard to display.
   */
  keyboardType?: KeyboardTypeOptions;
  /**
   * If true, the input field is read-only and cannot be edited.
   */
  readOnly?: boolean;
  /**
   * Callback function called when the input field loses focus.
   */
  onBlur?: () => void;
  /**
   * Callback function called when the text in the input field changes.
   * @param {string} text - The new text entered in the input field.
   */
  onChangeText?: (text: string) => void;
  /**
   * Callback function called when a touch gesture is initiated on the input field.
   */

  onFocus?: () => void;
  /**
   * Callback function called when the "submit" button is pressed on the keyboard.
   * @param {string} text - The current text in the input field.
   */
  onSubmitEditing?: (text?: string) => void;

  /**
   * The heading text to be displayed above the input field.
   */
  label: string;
  /**
   * Style for the container of the component.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the heading text.
   */
  headingStyles?: StyleProp<TextStyle>;

  assistiveText?: string;

  isError?: boolean;

  onClearInput?: () => void;
  /**
   * right icon for text input.
   */

  rightIcon?: ReactElement<any> | undefined;
  /**
   * flag to show left icon for text input.
   */

  showLeftIcon?: boolean;

  /**
   * flag to show right icon for text input.
   */
  showRightIcon?: boolean;

  /**
   * customized right icon.
   */
  customIcon?: ReactElement<any> | undefined;

  /**
   * Style for the input
   */
  inputStyle?: StyleProp<ViewStyle>;
  labelColor?: string;
  actionDisabled?: boolean;
  errorMessageViewStyle?: StyleProp<ViewStyle>;
  errorMessageStyle?: StyleProp<ViewStyle>;
  suffix?: string;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  extraComponent?: ReactElement<any> | undefined | null;
  withExtraPadding?: boolean;
}
