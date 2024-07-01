// actionSheetProps.ts

export interface IPayLatestSectionProps {
  testID?: string;

  transactionsData: object[] | null;
  offersData: object[] | null;
  /**
   * User Rearrange Function
   */
  openBottomSheet?: () => void;

  /**
   * User Profile Function
   */
  openProfileBottomSheet?: () => void;
}
