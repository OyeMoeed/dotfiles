export interface IPayAddCardBottomsheetProps {
  testID?: string;
  isEditingMode?: boolean;
  expiryOnPress?: () => void;
  cvvPress?: () => void;
  selectedDate?: string;
  onPressAddCards?: () => void;
  openExpiredDateBottomSheet?: () => void;
  openPressExpired?: () => void;
  closeBottomSheet?: () => void;
}
