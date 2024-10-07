import { MockAPIStatusProps } from '@network/services/services.interface';

export interface SarieTransferFeesTypes {
  feeAmount: string;
  vatAmount: string;
  bankFeeAmount: string;
  bankVatAmount: string;
}

export interface GetSarieTransferFeesResponseTypes {
  apiResponseNotOk: any;
  error(error: any): unknown;
  status: MockAPIStatusProps;
  response: SarieTransferFeesTypes;
  successfulResponse: boolean;
}
