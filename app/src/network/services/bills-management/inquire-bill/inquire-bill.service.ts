import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { InquireBillResponseTypes, InquireBillPayloadTypes } from './inquire-bill.interface';
import inquireBillMockResponse from './inquire-bill.mock';

const inquireBillService = async (payload: InquireBillPayloadTypes): Promise<InquireBillResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return inquireBillMockResponse;
  }
  try {
    const apiResponse: InquireBillResponseTypes = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.inquire_bill(),
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

export default inquireBillService;
