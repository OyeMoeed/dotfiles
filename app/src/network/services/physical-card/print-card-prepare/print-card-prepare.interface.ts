import { MockAPIStatusProps, DeviceInfoProps } from '@network/services/services.interface';

export interface PrintCardPreparePayloadTypes {
  // deviceInfo: DeviceInfoProps; //as per swagger
  deviceInfo: DeviceInfoProps; // as per old code
  cardIndex?: string; // as per old code
}

export interface PrintCardPrepareResponseTypes {
  status: MockAPIStatusProps;
  response: {
    otpRef: string;
    cardIndex: string; // as per old code
  };
  successfulResponse: boolean;
}
