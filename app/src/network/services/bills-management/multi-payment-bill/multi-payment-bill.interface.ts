import { MockAPIStatusProps } from '@network/services/services.interface';

interface BillPayDetailsArr {
  id?: string;
  label?: string;
  value?: string | null | number;
}
interface BillPaymentInfosTypes {
  billerId: string;
  billNumOrBillingAcct: string;
  amount: number;
  dueDateTime: string;
  billIdType: string;
  billingCycle: string;
  billIndex: string;
  serviceDescription: string;
  billerName: string;
  walletNumber: string;
  billNickname: string;
  billerIcon: string;
  transactionId?: string;
  billPayDetailsArr?: BillPayDetailsArr;
}

interface MultiPaymentBillPayloadTypes {
  otpRef: string;
  otp: string;
  billPaymentInfos: BillPaymentInfosTypes[];
}

interface BillPaymentTypes {
  statusCode: string;
  billIndex: string;
  payemntRefrenceInfo: string;
  totalAmount: string;
  refundId: string;
  refundState: string;
  refundRejectionReason: string;
  feeAmount: string;
  vatAmount: string;
  transactionId: string;
}

interface MultiPaymentBillResponseTypes {
  status: MockAPIStatusProps;
  response: {
    billPaymentResponses: BillPaymentTypes[];
  };
  successfulResponse: true;
}

export { BillPaymentInfosTypes, BillPaymentTypes, MultiPaymentBillPayloadTypes, MultiPaymentBillResponseTypes };
