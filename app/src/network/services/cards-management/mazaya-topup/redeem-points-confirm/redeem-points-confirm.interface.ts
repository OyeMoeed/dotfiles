import { IDeveiceInfo } from '@app/network/services/core/id-renewal/id-renewal.interface';

export interface IRedeemPointsConfirmReq {
  otp: string;
  redeemPoints: number;
  redeemAmount: number;
  deviceInfo: IDeveiceInfo;
}

export interface IRedeemPointsConfirmRes {
  redeemPoints: number;
  redeemAmount: number;
  date: string;
  referenceNumber: string;
  topupStatus?: string;
}
