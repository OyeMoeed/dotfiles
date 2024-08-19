import { GetWalletResponse } from '@app/network/services/core/get-wallet/get-wallet.interface';
import { payChannel } from '@app/utilities/enums.util';

export default interface IPayAmountProps {
  testID?: string;
  amounts?: { text: string; value: number }[];
  expiryOnPress: () => void;
  cvvPress: () => void;
  selectedDate: string;
  openExpiredDateBottomSheet: () => void;
  channel: payChannel;
  openPressExpired: () => void;
  onPressAddCards: () => void;
  walletInfo: GetWalletResponse;
  handleCardSelect: () => void;
  openExpirationBottomSheet: () => void;
  openCvvBottomSheet: () => void;
}
