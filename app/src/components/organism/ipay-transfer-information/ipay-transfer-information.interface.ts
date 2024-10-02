import { StyleProp, ViewStyle } from 'react-native';

interface TransferInfoData {
  icon?: string;
  bankName?: string;
  title?: string;
  accountNumber?: string;
}

interface IPayTransferInformationProps {
  showCount?: boolean;
  testID?: string;
  currencyStyle?: StyleProp<ViewStyle>;
  amount: string | number;
  style?: ViewStyle;
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
  showReason?: boolean;
}

export { IPayTransferInformationProps, TransferInfoData };
