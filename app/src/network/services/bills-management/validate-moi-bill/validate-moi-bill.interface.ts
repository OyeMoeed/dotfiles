import { MockAPIStatusProps } from '../../services.interface';

interface ValidateBillResponsesPayload {
  walletNumber: string;
}

interface ValidateBillResponse {
  response: {
    beneficiaryName: string;
    previousUnusedBalance: string;
    totalFeeAmount: string;
    referenceNumber: string;
    amount: number | string;
    serviceProvider: string;
    serviceType: string;
    serviceId: string;
    violationNo: string;
    violationDate: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}
export { ValidateBillResponse, ValidateBillResponsesPayload };
