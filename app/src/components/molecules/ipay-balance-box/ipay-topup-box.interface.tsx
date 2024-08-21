export interface IPayBalanceBoxProps {
  /**
   * The available balance, can be a string or a number.
   */
  availableBalance?: string | number;

  /**
   * The current balance, can be a string or a number.
   */

  /**
   * The remaining outgoing balance for the month, can be a string or a number.
   */


  monthlyRemainingIncommingAmount?: string | number;

  monthlyIncomingLimit: string;

  dailyRemainingOutgoingAmount? :string ; 
  
  monthlyIncomingLimit : string; 

  /**
   * Flag to indicate if the progress bar should be shown.
   */
  isShowProgressBar?: boolean;

  /**
   * Flag to indicate if the remaining balance should be shown.
   */
  isShowRemaining?: boolean;

  /**
   * Flag to indicate if the top-up option should be shown.
   */
  isShowTopup?: boolean;

  /**
   * Function to handle the top-up button press event.
   */
  onTopUpPress?: () => void;

  testID?: string;
}
