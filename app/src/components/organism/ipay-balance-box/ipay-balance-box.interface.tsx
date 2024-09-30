// actionSheetProps.ts

export interface IPayBalanceBoxProps {
  testID?: string;
  /**
   * User Account balance
   */
  balance?: string;
  /**
   * When clicked on the ‘i’ icon should display the respective wallet information (refer to US:)
   */
  hideBalance?: boolean;
  walletInfoPress?: () => void;
  /**
   *  A button for the user to view the options for the wallet top up
   */
  topUpPress?: () => void;
  /**
   *  quick Action Press
   */
  quickAction?: () => void;
  /**
   * to get layout height and set in state
   */
  setBoxHeight?: (value: number) => void;

  monthlyRemainingOutgoingAmount: string;

  monthlyOutgoingLimit: string;
  isLoading?: boolean;
  totalBalance: string;
}

export interface CarouselItem {
  text: string;
  icon: string;
  transfer_type?: string;
  isNew?: boolean;
  data: Array<CarouselItem>;
  /**
   * navigate to particular screen
   */
  navigate?: string;
}
