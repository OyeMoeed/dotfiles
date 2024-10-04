import { DeviceInfoProps } from '../../services.interface';

export interface IW2WFeesReq {
  requests: IReqRequest[];
  deviceInfo: DeviceInfoProps;
}

export interface IW2WFeesRes {
  requests: IW2WResRequest[];
}

export interface IW2WResRequest {
  mobileNumber: string;
  amount: string;
  note: string;
  walletNumber: any;
  giftCategory: any;
  feesAmount: string;
  vatAmount: string;
}

export interface IReqRequest {
  mobileNumber: string;
  amount: number;
  note?: string;
  transferPurpose: string;
}
