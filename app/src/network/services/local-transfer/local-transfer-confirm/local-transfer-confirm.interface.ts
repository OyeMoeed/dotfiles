import { MockAPIStatusProps } from '@network/services/services.interface';

export interface LocalTransferConfirmPayloadTypes {
  otp: string;
  otpRef: string;
  amount: string;
  authentication: {
    transactionId: string;
  };
  deviceInfo: {
    platformVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
  };
}

export interface LocalTransferConfirmResponseTypes {
  status: MockAPIStatusProps;
  response: {
    transactionId: string;
    exchangeRate: string;
    remittanceReferenceNumber: string;
    totalTransactionAmount: string;
    beneficiaryName: string;
    transferNetwork: string;
    amountDebited: string;
    amountDebitedCurrency: string;
    amountCredited: string;
    amountCreditedCurrency: string;
    totalDebitedFeeAmount: string;
    otpRef: string;
    feesDeductedFromAmount: boolean;
  };
  successfulResponse: boolean;
}
