import { MockAPIStatusProps } from '@network/services/services.interface';

export interface MultiPaymentPrepareBillPayloadTypes {
  deviceInfo: {
    platformVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
  };
  walletNumber: string;
}

export interface MultiPaymentPrepareBillResponseTypes {
  status: MockAPIStatusProps;
  response: {
    otpRef: string;
  };
  successfulResponse: boolean;
}
