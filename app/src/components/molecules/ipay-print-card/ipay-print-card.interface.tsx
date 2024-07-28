import { StyleProp, ViewStyle } from 'react-native';

interface IPayPrintCardProps {
  testID?: string;
  handlePrintCard: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}
export default IPayPrintCardProps;
