import { MockAPIStatusProps } from '@network/services/services.interface';

interface SaveBillResponseTypes {
  response: {
    billId: string;
    billStatus: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

interface SaveBillPayloadTypes {
  billerId?: string;
  billNumOrBillingAcct: string;
  billIdType?: string;
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

export { SaveBillPayloadTypes, SaveBillResponseTypes };
