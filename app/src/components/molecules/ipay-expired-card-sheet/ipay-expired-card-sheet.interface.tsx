import CardItemProps from "../ipay-cardselector/ipay-card.interface";

interface IPayExpiredCardSheetProps {
  testID?: string;
  openExpirationBottomSheet?: () => void;
  openExpiredDateBottomSheet?: () => void;
  openCvvBottomSheet?: () => void;
  selectedDate?: string;
  selectedCard?:CardItemProps
}
export default IPayExpiredCardSheetProps;
