// actionSheetProps.ts

import { GetWalletResponse } from '@app/network/services/core/get-wallet/get-wallet.interface';
import { buttonVariants, PayChannel, TopUpStates } from '@app/utilities/enums.util';
import { ViewStyle } from 'react-native-size-matters';

interface IPayRemainingBalanceProps {
  testID?: string;
  currencyStyle: ViewStyle;
  inputStyles: ViewStyle;
  defaultValue: string;
  walletInfoPress?: () => void;
  topUpPress?: () => void;
  PayChannelType?: PayChannel;
  quickAction?: () => void;
  showHideBalanceOption?: boolean;
  showWalletOption?: boolean;
  walletInfo: GetWalletResponse;
  topUpBtnVariant?: buttonVariants;
  showProgress?: boolean;
  showIcon?: boolean;
  qrScanBtn?: boolean;
  topUpAmount?: number | string;
  setTopUpAmount?: (text: string) => void;
  onPressAddCards?: () => void;
  chipValue?: string;
  setChipValue?: () => void;
  openPressExpired?: () => void;
  handleCardSelect?: (card?: any) => void;
  selectedCard?: () => void;
  currentState?: TopUpStates;
  showQuickAmount?: () => void;
  isQrBtnDisabled?: boolean;
  isEditable?: boolean;
  onPressIcon?: () => void;
  onPressQR?: () => void;
  balanceType?: 'Incoming' | 'Outgoing';
}
export default IPayRemainingBalanceProps;
