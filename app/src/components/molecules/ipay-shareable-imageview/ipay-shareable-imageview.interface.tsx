import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface IPayShareableImageViewProps {
  children: ReactNode; // ReactNode allows any valid JSX children
  shareButtonStyles?: StyleProp<ViewStyle>; // Example: Use 'any' for styles or adjust as per actual type
  testID?: string;
  otherView?: ReactNode;
  isShareable?: boolean;
}
export default IPayShareableImageViewProps;
