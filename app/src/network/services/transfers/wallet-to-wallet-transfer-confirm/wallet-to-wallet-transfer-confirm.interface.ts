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
  receivedRequestsResult: ReceivedRequestsResult[];
}

export interface ReceivedRequestsResult {
  transctionRefNumber: string;
  transactionId: string;
  totalTansactionAmount: string;
  beneficiaryName: string;
}
