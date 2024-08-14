import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { ScrollViewProps } from 'react-native';

export interface IPayKeyboardAwareScrollViewProps extends ScrollViewProps, KeyboardAwareScrollViewProps {
  testID?: string;
}
