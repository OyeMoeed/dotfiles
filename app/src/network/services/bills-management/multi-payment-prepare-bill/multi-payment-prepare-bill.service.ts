import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import {
  MultiPaymentPrepareBillPayloadTypes,
  MultiPaymentPrepareBillResponseTypes,
} from './multi-payment-prepare-bill.interface';
import multiPaymentPrepareBillMockResponse from './multi-payment-prepare-bill.mock';

const multiPaymentPrepareBillService = async (
  payload: MultiPaymentPrepareBillPayloadTypes,
): Promise<MultiPaymentPrepareBillResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return multiPaymentPrepareBillMockResponse;
  }
  try {
    const apiResponse: MultiPaymentPrepareBillResponseTypes = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.multi_payment_prepare_bill(),
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

export default multiPaymentPrepareBillService;
