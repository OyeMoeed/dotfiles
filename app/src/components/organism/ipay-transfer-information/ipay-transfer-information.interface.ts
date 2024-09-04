import { ViewStyle } from 'react-native';

interface TransferInfoData {
  icon?: string;
  bankName?: string;
  title?: string;
  accountNumber?: string;
}

export interface IPayTransferInformationProps {
  testID?: string;
  currencyStyle?: ViewStyle;
  style?: ViewStyle;
  amount: string | number;
  setAmount: (text: string | number) => void;
  isEditable?: boolean;
  openReason?: () => void;
  setSelectedItem: (text: string) => void;
  selectedItem?: string;
  notes?: string;
  setNotes: (text: string) => void;
  showRemoveFormOption?: () => void;
  showRemoveBtn?: boolean;
  transferInfo?: boolean;
  chipValue?: string;
  transferInfoData?: TransferInfoData;
  hasWallet?: boolean;
  subtitle?: string;
  maxLength?: number;
  inputFieldStyle?: ViewStyle;
}
