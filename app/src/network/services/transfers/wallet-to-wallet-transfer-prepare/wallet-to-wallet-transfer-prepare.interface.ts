import { DeviceInfoProps } from '../../services.interface';

export interface IW2WTransferPrepareReq {
  requests: IRequest[];
  deviceInfo: DeviceInfoProps;
}

interface IRequest {
  mobileNumber: string;
  amount: string;
  note: string;
  transferPurpose: string;
}

export interface IW2WTransferPrepareRes {
  otpRef: string;
}
