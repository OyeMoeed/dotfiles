import { SadadBillItemProps } from '@app/components/organism/ipay-sadad-bill-details-box/ipay-sadad-bill-details-box.interface';
import { Control } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { FormValues } from '../ipay-create-beneficiary/ipay-create-beneficiary.interface';

// Interface for the props passed to the PayBillBalance component
interface IPayBillBalanceProps {
  selectedBills: SadadBillItemProps[]; // Array of selected bill items
  toggleControl: Control<FormValues>; // Control object for form handling
  saveBillToggle?: boolean; // Boolean indicating the bill save functionality is enabled or not
  isSaveOnly?: boolean; // Boolean indicating if its saveOnly Bill
}

interface BalanceVariantOptions {
  warningText: string; // The text to display in the warning chip
  disabledBtn: boolean; // Flag indicating if the footer button is disabled
  gradientWidth: string; // Width of the gradient background
  progressBarBg: StyleProp<ViewStyle>; // Style properties for the progress bar background
  gradient: string[]; // Array of gradient colors max 2
}

interface BalanceStatusVariants {
  insufficient: BalanceVariantOptions; // Variant for insufficient balance
  noRemainingAmount: BalanceVariantOptions; // Variant for no remaining amount
  accountBalance: BalanceVariantOptions; // Variant for accoun balance
}

export { BalanceStatusVariants, BalanceVariantOptions, IPayBillBalanceProps };
