// actionSheetProps.ts

export interface IPayBalanceBoxProps {
  testID?: string;
  /**
   * User Account balance
   */
  balance?: string;
  /**
   * Total Account balance
   */
  totalBalance?: string;
  /**
   * When clicked on the ‘i’ icon should display the respective wallet information (refer to US:)

   */
  walletInfoPress?: () => void;
  /**
   *  A button for the user to view the options for the wallet top up
   */
  topUpPress?: () => void;
  /**
   *  quick Action Press
   */
  quickAction?: () => void;
}

// Define an interface for localization text
export interface LocalizationText {
  send_money: string;
  request_money: string;
  send_gift: string;
  bill_Payments: string;
  international_Tr: string;
  ATM_Withdrawals: string;
  Local_transfer: string;
  Spending_limit: string;
  QR_acceptance: string;
  My_account: string;
}
