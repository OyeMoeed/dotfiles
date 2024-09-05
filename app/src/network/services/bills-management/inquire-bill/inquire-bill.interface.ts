import { MockAPIStatusProps } from '@network/services/services.interface';

export interface InquireBillResponseTypes {
  response: {
    billId: string;
    billStatus: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

export interface InquireBillPayloadTypes {
  billerId: string;
  billNumOrBillingAcct: string;
  billIdType: string;
  billerName: string;
  deviceInfo: {
    hashCode: string;
    platformVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
  };
  billNickname: string;
  walletNumber: string;
}
