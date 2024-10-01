interface TransferMethodItemProps {
  id: number;
  transferMethodName: string;
  transferMethodLogo: string;
  remitterAmount: number;
  beneficiaryAmount: number;
  totalBeneficiaryAmount: string;
  remitterCurrency: string;
  beneficiaryCurrency: string;
  fee?: string;
}

interface CountryCurrencyBoxProps {
  transferMethod: TransferMethodItemProps; // The item containing country and currency details.
  isChecked?: boolean; // Optional boolean to indicate if the box is checked.
  remitterCurrencyAmount?: string; // Optional value for the sender's input field.
  beneficiaryCurrencyAmount?: string; // Optional value for the receiver's input field.
  onRemitterAmountChange?: (amount: string) => void; // Optional callback function for when the sender's value changes.
  onBeneficiaryAmountChange?: () => void; // Optional callback function for when the receiver's value changes.
  onTransferMethodChange?: () => void; // Optional callback function for when the checked state changes.
}

export default CountryCurrencyBoxProps;
