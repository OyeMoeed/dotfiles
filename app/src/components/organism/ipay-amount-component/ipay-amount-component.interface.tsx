import { GetWalletResponse } from '@app/network/services/core/get-wallet/get-wallet.interface';
import { PayChannel } from '@app/utilities/enums.util';

interface IPayAmountProps {
  testID?: string;
  amounts?: { text: string; value: number }[];
  expiryOnPress: () => void;
  cvvPress: () => void;
  selectedDate: string;
  openExpiredDateBottomSheet: () => void;
  channel: PayChannel;
  openPressExpired: () => void;
  onPressAddCards: () => void;
  walletInfo: GetWalletResponse;
  handleCardSelect: () => void;
  openExpirationBottomSheet: () => void;
  openCvvBottomSheet: () => void;
}

export default IPayAmountProps;
