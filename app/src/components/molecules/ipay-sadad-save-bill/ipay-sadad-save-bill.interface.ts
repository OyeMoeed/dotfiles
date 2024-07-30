import { Control } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { FormValues } from '../ipay-sadad-bill-detail/ipay-sadad-bill-detail.interface';

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
  /**
   * use to name input
   */
  billInputName: string;
  /**
   * Toggle input name
   */
  toggleInputName: string;
  /**
   * to set control for toggle
   */
  toggleControl: Control<FormValues>;
}

export default SadadSaveBillProps;
