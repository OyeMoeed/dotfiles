import { MockAPIStatusProps } from '@network/services/services.interface';

export interface EditBillPayloadTypes {
  billNumOrBillingAcct: string;
  billId: string;
  billNickname: string;
  walletNumber: string;
  deviceInfo: {
    platformVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
  };
}

export interface EditBillResponseTypes {
  status: MockAPIStatusProps;
  response: {
    billId: string;
    billStatus: string;
  };
  successfulResponse: true;
}
