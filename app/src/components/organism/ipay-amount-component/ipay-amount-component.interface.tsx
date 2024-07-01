export default interface IPayAmountProps {
  amounts?: { text: string; value: number }[];
  expiryOnPress: () => void;;
  cvvPress: () => void;
  selectedDate: string;
  openExpiredDateBottomSheet: () => void;
  channel: string;
  openPressExpired: () => void;
  onPressAddCards: () => void
}
