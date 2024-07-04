interface IPayExpiredCardSheetProps {
  testID?: string;
  openExpirationBottomSheet?: () => void;
  openExpiredDateBottomSheet?: () => void;
  openCvvBottomSheet?: () => void;
  selectedDate?: string;
}
export default IPayExpiredCardSheetProps;
