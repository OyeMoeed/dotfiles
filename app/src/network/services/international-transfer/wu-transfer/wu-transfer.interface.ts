import { ApiError, DeviceInfoProps, MockAPIStatusProps } from '../../services.interface';

interface WUTransferDetails {
  transactionId: string;
  exchangeRate: string;
  otpRef: string;
  referenceNumber: string;
}

interface WUTransferResponse {
  response: WUTransferDetails;
}

interface Authentication {
  transactionId: string;
}

interface WUTransferProps extends WUTransferResponse {
  status: MockAPIStatusProps;
  successfulResponse: boolean;
  ok: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

interface WUTransferPayload {
  authentication: Authentication;
  otpRef: string;
  otp: string;
  deviceInfo: DeviceInfoProps;
}

export { WUTransferDetails, WUTransferPayload, WUTransferProps };
