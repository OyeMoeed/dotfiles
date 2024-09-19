import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_URLS from '../../bills-urls';
import { InlinePaymentValidationProps, PaymentValidationPayloadProps } from './payment-validation.interface';
import paymentValidationMock from './payment-validation.mock';

const paymentValidation = async (
  payload: PaymentValidationPayloadProps,
  inlineParams: InlinePaymentValidationProps,
): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = paymentValidationMock;
    return response;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: BILLS_URLS.VALIDATE_PAYMENT(inlineParams?.billerId, inlineParams?.serviceId),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default paymentValidation;
