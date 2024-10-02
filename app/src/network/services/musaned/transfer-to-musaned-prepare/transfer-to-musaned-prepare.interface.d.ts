import { DeviceInfoProps } from '@app/network/utilities/utilities.interface';
import { MockAPIStatusProps } from '../../services.interface';

export interface TransferToMusanedPrepareMockProps {
  status: MockAPIStatusProps;
  authentication: {
    transactionId: string;
  };
  response: {
    otpRef: string;
  };
  successfulResponse: boolean;
}

export interface TransferToMusanedPrepareReqPayload {
  employeePoi: string;
  transferJustificationType: string;
  salaryMonth: string;
  amountWithDeduction: string;
  transferJustificationDescription: string;
  transactionDescription: string;
  deviceInfo: DeviceInfoProps;
}

export interface TransferToMusanedPrepareReqParams {
  walletNumber: string;
}
