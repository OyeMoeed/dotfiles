import { MockAPIStatusProps } from '@network/services/services.interface';

export interface BillersTypes {
  billerId: string;
  isrefundAllowed: boolean;
  billIdType: string;
  billerServices: string;
  billerTypeDesc: string;
  billerType: string;
  billerDesc: string;
  typeOfPayment: string;
  billerCode: string;
}

export interface GetBillersResponseTypes {
  response: {
    billersList: BillersTypes[];
  };
  successfulResponse: true;
  status: MockAPIStatusProps;
}

export interface GetBillersPayloadTypes {
  includeBillerDetails: string;
  deviceInfo: {
    platformVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
  };
  billerStatus: string;
}
