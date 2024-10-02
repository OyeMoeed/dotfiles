import { DeviceInfoProps, MockAPIStatusProps } from '../../services.interface';

export interface TransferToMusanedConfirmMockProps {
  status: MockAPIStatusProps;
  authentication: {
    transactionId: string;
  };
  response: {
    mobileNumber: string;
    amount: string;
    walletNumber: string;
    beneficiaryName: string;
    trxDateTime: string;
    salaryMonth: string;
    transferJustificationDescription: string;
    transactionId: string;
  };
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
