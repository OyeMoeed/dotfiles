import { KeyboardTypeOptions, TextStyle, ViewStyle } from 'react-native';
import { inputVariants } from '@app/utilities/enums';

/**
 * Props for the RNTextInput component.
 */
export interface IPaySelectorInputProps {
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
  style?: (TextStyle | undefined)[];

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
   * Callback function called when the input field loses focus.
   */
  onBlur?: () => void;
  /**
   * Callback function called when the text in the input field changes.
   * @param {string} text - The new text entered in the input field.
   */
  onChangeText?: (text: string) => void;

  /**
   * Callback function called when the input field receives focus.
   */
  onFocus?: () => void;
  /**
   * Callback function called when the "submit" button is pressed on the keyboard.
   * @param {string} text - The current text in the input field.
   */
  onSubmitEditing?: (text?: string) => void;
  /**
   * Style for the container of the component.
   */
  containerStyle?: ViewStyle;
  /**
   * Style for the heading text.
   */
  headingStyles?: TextStyle;
  /**
 * any kind of assistive Text for component
 */
  assistiveText?: string;
  /**
    * If true, the input field will show error.
    */
  isError?: boolean;
  /**
  * If phone number variant shoukld show flag image, 
  */
  flagImage?: string;
  /**
 * Callback function called when the "submit" button is pressed on the keyboard.
 * @param {string} text - The current text in the input field.
 */
  onClearInput?: () => void;
  /**
     * If true, the input field will show left icon.
     */
  showLeftIcon?: boolean;

  countryCode?: string;
  /**
* have two variants for showing phone number and currency field
*/
  variant?: inputVariants;

  currency?: string;
  /**
* adition Icon
*/
  showIcon?: boolean;
}

