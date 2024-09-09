import { IDeveiceInfo } from '@app/network/services/core/id-renewal/id-renewal.interface';

export interface ApplePayCheckOutReq {
  clickPayApplePayToken: {
    transactionIdentifier: string;
    paymentMethod: {
      network: string;
      type: string;
      displayName: string;
    };
    paymentData: string;
  };
  amount: string;
  cardBrand: string;
  deviceInfo: IDeveiceInfo;
}
export interface ApplePayCheckOutRes {
  transactionRefNumber?: string;
  amount: string;
}
