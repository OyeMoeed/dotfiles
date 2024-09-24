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
export { RequiredInPaymentOrRefund };

export default MoiFormFormValues;
