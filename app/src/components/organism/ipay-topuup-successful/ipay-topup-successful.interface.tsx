interface IPayTopUpSuccessProps {
  completionStatus: string;
  /**
   * This Tells wether if the topup is successfull or failed
   */

  topupChannel: string;
  /** *
   * this tells wether the screens belongs to the APPLE or CARD variant of the topup
   */

  goBack: string;
  amount?: string;

  isUnderProccess: boolean;

  summaryData: any;

  // it is the data that is passed to the  success screen after the successful recived request
  requestPaidSummaryData?: any;
}

export interface PayData {
  id: string;
  leftIcon: string;
  detailsText: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  isAlinma: boolean;
  index: number;
}

export default IPayTopUpSuccessProps;
