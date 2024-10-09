import { NewSadadBillFormValues } from '@app/screens/new-sadad-bill/new-sadad-bill.interface';
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
  toggleControl: Control<FormValues | NewSadadBillFormValues>;
}

export default SadadSaveBillProps;
