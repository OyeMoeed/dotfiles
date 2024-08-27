import { DeviceInfoProps } from '../../services.interface';

export interface IW2WTransferConfirmReq {
  authentication: {
    transactionId: string;
  };
  otp: string;
  otpRef: string;
  deviceInfo: DeviceInfoProps;
}

export interface IW2WTransferConfirmRes {
  transferRequestsResult: TransferRequestsResult[];
}

export interface TransferRequestsResult {
  mobileNumber: string;
  amount: any;
  note: string;
  walletNumber?: string;
  status: string;
  statusDesc?: string;
  transactionId: any;
  transferPurpose?: string;
}
