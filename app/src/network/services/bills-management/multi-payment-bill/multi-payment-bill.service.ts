import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { MultiPaymentBillPayloadTypes, MultiPaymentBillResponseTypes } from './multi-payment-bill.interface';
import multiPaymentBillMockResponse from './multi-payment-bill.mock';

const multiPaymentBillService = async (
  payload: MultiPaymentBillPayloadTypes,
): Promise<MultiPaymentBillResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return multiPaymentBillMockResponse;
  }
  try {
    const apiResponse: MultiPaymentBillResponseTypes = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.multi_payment_bill(),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse;
    }

    return { apiResponseNotOk: true, apiResponse };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default multiPaymentBillService;
