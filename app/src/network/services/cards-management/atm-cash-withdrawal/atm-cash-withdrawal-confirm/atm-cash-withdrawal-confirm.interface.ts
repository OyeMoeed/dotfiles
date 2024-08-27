import { DeviceInfoProps } from '@app/network/services/services.interface';

export interface IAtmWithdrawalConfirmReq {
  terminal: String;
  vatAmount: String;
  feeAmount: String;
  amount: String;
  deviceInfo: DeviceInfoProps;
}

export interface IAtmWithdrawalConfirmRes {
  referenceNumber: string;
}
