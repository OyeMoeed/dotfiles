import { MockAPIStatusProps } from '../../services.interface';

interface ValidateBillResponsesPayload {
  walletNumber: string;
}
interface ValidateBillRes {
  previousUnusedBalance: string;
  totalFeeAmount: string;
  groupPaymentId: string;
  paymentId: string;
  paymentMethod: string;
  billerId: string;
  feeList: any;
  beneficiaryName: string;
  referenceNumber: string;
  amount: number | string;
  serviceProvider: string;
  serviceType: string;
  serviceId: string;
  violationNo: string;
  violationDate: string;
}

interface ValidateBillResponse {
  response: ValidateBillRes;
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}
export { ValidateBillRes, ValidateBillResponse, ValidateBillResponsesPayload };
