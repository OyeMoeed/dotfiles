import { ApiError, MockAPIStatusProps } from '../../services.interface';

interface WuFeesInquiryResponse {
  principleAmount: string;
  principleCurrency: string;
  promoDiscount: string;
  exchangeRate: string;
  feeAmount: string;
  vatAmount: string;
  bankFeeAmount: string;
  bankVatAmount: string;
}

interface WuFeesInquiryProps {
  status: MockAPIStatusProps;
  response: WuFeesInquiryResponse;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

interface DeviceInfo {
  platformVersion: string;
  deviceId: string;
  deviceName: string;
  platform: string;
}

interface FeesInquiryPayload {
  amount: string;
  amountCurrency: string;
  convertedAmountCurrency: string;
  deductFeesFromAmount: boolean;
  promoCode: string | null;
  deviceInfo: DeviceInfo;
}

export { FeesInquiryPayload, WuFeesInquiryProps, WuFeesInquiryResponse };
