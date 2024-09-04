import { ApiError, DeviceInfoProps, MockAPIStatusProps } from '../../services.interface';

interface AETransferConfirmDetails {
  transactionId: string;
  exchangeRate: string;
  remittanceReferenceNumber: string;
  totalTransactionAmount: string;
  beneficiaryName: string;
  transferNetwork: string;
  amountDebited: string;
  amountDebitedCurrency: string;
  amountCredited: string;
  amountCreditedCurrency: string;
  totalDebitedFeeAmount: string;
  otpRef: string;
  feesDeductedFromAmount: boolean;
}

interface AETransferConfirmResponse {
  response: AETransferConfirmDetails;
}

interface Authentication {
  transactionId: string;
}

interface AETransferConfirmProps extends AETransferConfirmResponse {
  status: MockAPIStatusProps;
  successfulResponse: boolean;
  ok: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
  authentication: Authentication;
}

interface AETransferConfirmPayload {
  otp: string;
  otpRef: string;
  amount: string;
  authentication: Authentication;
  deviceInfo: DeviceInfoProps;
}

export { AETransferConfirmDetails, AETransferConfirmPayload, AETransferConfirmProps };
