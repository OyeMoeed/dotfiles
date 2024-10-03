import { ApiError, DeviceInfoProps, MockAPIStatusProps } from '../../services.interface';

interface ValidateWUTransferPayload {
  amount: string;
  amountCurrency: string;
  wuTransactionReason: string;
  transferPurposeCode?: string;
  feeAmount: string;
  vatAmount: string;
  bankFeeAmount: string;
  bankVatAmount: string;
  promoCode: string | null;
  deviceInfo: DeviceInfoProps;
}

interface ValidateWUTransferResponse {
  transactionId: string;
  exchangeRate: string;
  otpRef: string;
  referenceNumber: string;
}

interface ValidateWUTransferProps {
  status: MockAPIStatusProps;
  response: ValidateWUTransferResponse;
  ok: boolean;
  apiResponseNotOk: boolean;
  error?: ApiError;
}

export { ValidateWUTransferPayload, ValidateWUTransferProps, ValidateWUTransferResponse };
