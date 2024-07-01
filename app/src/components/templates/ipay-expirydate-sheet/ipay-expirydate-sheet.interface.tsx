export interface IPayExpiryDateSheetProps {
  testID?: string;
  selectedDate?: string;
  closeExpiredBottomSheet: () => void;
  setSelectedDate: (date: string) => void;
}
