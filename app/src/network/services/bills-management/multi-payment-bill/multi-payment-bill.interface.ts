import { MockAPIStatusProps } from '@network/services/services.interface';

export interface BillPaymentInfosTypes {
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
}

export interface MultiPaymentBillPayloadTypes {
  otpRef: string;
  otp: string;
  billPaymentInfos: BillPaymentInfosTypes[];
}

export interface BillPaymentTypes {
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

export interface MultiPaymentBillResponseTypes {
  status: MockAPIStatusProps;
  response: {
    billPaymentResponses: BillPaymentTypes[];
  };
  successfulResponse: true;
}
