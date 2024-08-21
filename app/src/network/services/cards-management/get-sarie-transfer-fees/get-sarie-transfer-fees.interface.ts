import { MockAPIStatusProps } from '@network/services/services.interface';

export interface GetSarieTransferFeesResponseTypes {
  status: MockAPIStatusProps;
  response: {
    feeAmount: string;
    vatAmount: string;
    bankFeeAmount: string;
    bankVatAmount: string;
  };
  successfulResponse: boolean;
}
