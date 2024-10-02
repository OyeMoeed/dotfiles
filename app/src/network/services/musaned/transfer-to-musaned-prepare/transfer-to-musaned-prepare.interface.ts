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
  amountWithDeduction?: string;
  bonusAmount?: number | string;
  deviceInfo: DeviceInfoProps;
  employeePoi: string;
  salaryMonth?: number | string;
  transactionDescription?: string;
  transferJustificationDescription?: string;
  transferJustificationType?: string;
  fromMonth?: Date | string | null;
  toMonth?: Date | string | null;
}

export interface TransferToMusanedPrepareReqParams {
  walletNumber: string;
}
