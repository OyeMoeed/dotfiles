import { ApiError, DeviceInfoProps, MockAPIStatusProps } from '../../services.interface';

interface AETransferPrepareDetails {
  transactionId?: string;
  otpRef: string;
}

interface AETransferPrepareResponse {
  response: AETransferPrepareDetails;
}

interface Authentication {
  transactionId: string;
}

interface AETransferPrepareProps extends AETransferPrepareResponse {
  status: MockAPIStatusProps;
  successfulResponse: boolean;
  ok: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
  authentication: Authentication;
}

interface AETransferPreparePayload {
  beneficiaryCode: string;
  transferPurpose: string;
  feesAmount: string;
  vatAmount: string;
  bankFeesAmount: string;
  bankVatAmount: string;
  amountCurrency: string;
  amount: string;
  deductFeesFromAmount: boolean;
  deviceInfo: DeviceInfoProps;
}

export { AETransferPrepareDetails, AETransferPreparePayload, AETransferPrepareProps };
