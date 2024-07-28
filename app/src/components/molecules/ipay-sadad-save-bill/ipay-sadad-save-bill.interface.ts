import { StyleProp, ViewStyle } from 'react-native';

interface SadadSaveBillProps {
  /**
   * Boolean indicating the bill save functionality is enabled or not.
   */
  saveBillToggle?: boolean;

  /**
   * Function to toggle the save state of the bill.
   */
  onSaveBillToggle?: () => void;

  /**
   * The current value of the bill's name.
   */
  billNameValue?: string;

  /**
   * Function to handle changes to the bill name.
   */
  onBillNameChange?: (newName: string) => void;
  /**
   * style for the container of the component.
   */
  style?: StyleProp<ViewStyle>;
}

export default SadadSaveBillProps;
