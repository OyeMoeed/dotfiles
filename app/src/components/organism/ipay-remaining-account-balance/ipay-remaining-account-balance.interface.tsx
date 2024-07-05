// actionSheetProps.ts

import { GetWalletResponse } from '@app/network/services/core/get-wallet/get-wallet.interface';
import { buttonVariants, payChannel } from '@app/utilities/enums.util';

interface IPayRemainingBalanceProps {
  testID?: string;
  /**
   * User Account balance
   */

  walletInfoPress?: () => void;
  /**
   *  A button for the user to view the options for the wallet top up
   */
  topUpPress?: () => void;
  /**
   *  quick Action Press
   */
  payChannelType?: payChannel;
  quickAction?: () => void;
  showHideBalanceOption?: boolean;
  showWalletOption?: boolean;
  walletInfo: GetWalletResponse;
  topUpBtnVariant: buttonVariants;
  showProgress: boolean;
  topUpAmount?: string;
  setTopUpAmount: () => void;
  onPressAddCards?: () => void;
  chipValue?: string;
  setChipValue?: () => void;
  openPressExpired?: () => void;
  handleCardSelect?: () => void;
  selectedCard?: () => void;
  currentState?: string;
}
export { IPayRemainingBalanceProps };
