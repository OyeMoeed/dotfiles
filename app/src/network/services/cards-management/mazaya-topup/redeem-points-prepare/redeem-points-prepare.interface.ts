import { IDeveiceInfo } from '@app/network/services/core/id-renewal/id-renewal.interface';

export interface IRedeemPointsPrepareReq {
  deviceInfo: IDeveiceInfo;
}

export interface IRedeemPointsPrepareRes {
  phoneNumber: string;
  otpRef: string;
}
