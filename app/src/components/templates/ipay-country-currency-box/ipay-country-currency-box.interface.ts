interface ConverterItemProps {
  id: number;
  bankName: string;
  bankImage: string;
  sar: number;
  egp: number;
  balance: string;
  senderCurrency: string;
  converterCurrency: string;
  fee?: string;
}

interface CountryCurrencyBoxProps {
  item: ConverterItemProps; // The item containing country and currency details.
  isChecked?: boolean; // Optional boolean to indicate if the box is checked.
  senderValue?: string; // Optional value for the sender's input field.
  receiverValue?: string; // Optional value for the receiver's input field.
  onSenderChange?: () => void; // Optional callback function for when the sender's value changes.
  onReceiverChange?: () => void; // Optional callback function for when the receiver's value changes.
  onCheckChange?: () => void; // Optional callback function for when the checked state changes.
}

export default CountryCurrencyBoxProps;
