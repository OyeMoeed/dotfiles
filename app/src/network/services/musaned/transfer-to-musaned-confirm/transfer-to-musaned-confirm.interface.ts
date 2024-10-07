import { DeviceInfoProps, MockAPIStatusProps } from '../../services.interface';

export interface TransferToMusanedConfirmResMockProps {
  mobileNumber: string;
  amount: string;
  walletNumber: string;
  beneficiaryName: string;
  trxDateTime: string;
  salaryMonth: string;
  transferJustificationDescription: string;
  transactionId: string;
}

export interface TransferToMusanedConfirmMockProps {
  status: MockAPIStatusProps;
  authentication: {
    transactionId: string;
  };
  response: TransferToMusanedConfirmResMockProps;
  successfulResponse: boolean;
}

export interface TransferToMusanedConfirmReqPayload {
  otpRef: string;
  otp: string;
  deviceInfo: DeviceInfoProps;
  authentication: {
    transactionId: string;
  };
}

export interface TransferToMusanedConfirmReqParams {
  walletNumber: string;
}
