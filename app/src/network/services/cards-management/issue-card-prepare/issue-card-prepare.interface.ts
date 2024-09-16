import { DeviceInfoProps } from '../../services.interface';

export interface IPrepareIssueCardReq {
  deviceInfo: DeviceInfoProps;
  physicalCard: boolean;
  transactionType: string;
}

export interface IPrepareIssueCardRes {
  otpRef: string;
}
