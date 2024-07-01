export default interface IpayTopupSuccessProps {

  completionStatus: string
  /**
   * This Tells wether if the topup is successfull or failed
   */

  topupChannel: string,
  /***
   * this tells wether the screens belongs to the APPLE or CARD variant of the topup
   */

  goBack: string
}
