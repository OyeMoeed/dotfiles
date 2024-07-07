import { GetWalletResponse } from "@app/network/services/core/get-wallet/get-wallet.interface";

export default interface IPayAmountProps {
  testID?:string;
  amounts?: { text: string; value: number }[];
  expiryOnPress: () => void;
  cvvPress: () => void;
  selectedDate: string;
  openExpiredDateBottomSheet: () => void;
  channel: string;
  openPressExpired: () => void;
  onPressAddCards: () => void;
  walletInfo: GetWalletResponse;
  handleCardSelect: () => void;
  openExpirationBottomSheet: () => void;
  openCvvBottomSheet: () => void;
}
