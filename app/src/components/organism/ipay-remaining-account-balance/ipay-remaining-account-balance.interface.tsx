// actionSheetProps.ts

import { GetWalletResponse } from '@app/network/services/core/get-wallet/get-wallet.interface';
import { buttonVariants, payChannel } from '@app/utilities/enums.util';

interface IPayRemainingBalanceProps {
  testID?: string;
  walletInfoPress?: () => void;
  topUpPress?: () => void;
  payChannelType?: payChannel;
  quickAction?: () => void;
  showHideBalanceOption?: boolean;
  showWalletOption?: boolean;
  walletInfo?: GetWalletResponse;
  topUpBtnVariant?: buttonVariants;
  showProgress?: boolean;
  topUpAmount?: string;
  setTopUpAmount?: (text: string) => void;
  onPressAddCards?: () => void;
  chipValue?: string;
  setChipValue?: () => void;
  openPressExpired?: () => void;
  handleCardSelect?: () => void;
  selectedCard?: () => void;
  currentState?: string;
  showQuickAmount?: () => void;
  showIcon?: boolean;
  qrScanBtn?: boolean;
}
export { IPayRemainingBalanceProps };
