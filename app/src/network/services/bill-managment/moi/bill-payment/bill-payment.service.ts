import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_URLS from '../../bills-urls';
import { MOIBillPaymentPayloadProps } from './bill-payment.interface';
import moiBillPaymentMock from './bill-payment.mock';

const moiBillPayment = async (payload: MOIBillPaymentPayloadProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = moiBillPaymentMock;
    return response;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: BILLS_URLS.MOI_BILL_PAYMENT,
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

export default moiBillPayment;
