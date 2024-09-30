interface MoiFormFormValues {
  serviceProvider: string;
  serviceType: string;
  idType: string;
  duration: string;
  beneficiaryId: string;
  myId: string;
  myIdInput: string;
  myIdCheck?: boolean;
}
const RequiredInPaymentOrRefund = {
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
  BOTH: 'BOTH',
};
interface ValidateBillRes {
  previousUnusedBalance: string;
  totalFeeAmount: string;
  groupPaymentId: string;
  paymentId: string;
  paymentMethod: string;
  billerId: string;
  feeList: any;
  dynamicFields: any;
  serviceTypeFromLOV: any;
}
export { RequiredInPaymentOrRefund, ValidateBillRes };

export default MoiFormFormValues;
