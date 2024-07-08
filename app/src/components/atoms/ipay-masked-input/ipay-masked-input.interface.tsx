// ipay-masked-input.interface.ts

import { StyleProp, ViewStyle } from 'react-native';
import { TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';

export interface IPayMaskedInputProps {
  testID?: string;
  label?: string;
  rightIcon?: JSX.Element;
  isError?: boolean;
  editable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onClearInput?: () => void;
  assistiveText?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  showRightIcon?: boolean;
  type: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  customIcon?: JSX.Element;
  [x: string]: any; // For any additional props
}
export default IPayMaskedInputProps;
