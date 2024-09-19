import { MockAPIStatusProps } from '@network/services/services.interface';

export interface LocalTransferPreparePayloadTypes {
  beneficiaryCode: string;
  transferPurpose: string;
  feesAmount: string;
  vatAmount: string;
  bankFeesAmount: string;
  bankVatAmount: string;
  amountCurrency: string;
  amount: string;
  deductFeesFromAmount: boolean;
  deviceInfo: {
    platformVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
  };
}

export interface LocalTransferPrepareResponseTypes {
  status: MockAPIStatusProps;
  authentication: {
    transactionId: string;
  };
  response: {
    otpRef: string;
  };
  successfulResponse: boolean;
}
