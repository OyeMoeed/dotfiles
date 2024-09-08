import { MockAPIStatusProps, DeviceInfoProps } from '@network/services/services.interface';

export interface MultiPaymentPrepareBillPayloadTypes {
  deviceInfo: DeviceInfoProps;
  walletNumber: string;
}

export interface MultiPaymentPrepareBillResponseTypes {
  status: MockAPIStatusProps;
  response: {
    otpRef: string;
  };
  successfulResponse: boolean;
}
