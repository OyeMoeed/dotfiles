import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { InquireBillPayloadProps } from './inquire-bill.interface';
import saveBillMock from './inquire-bill.mock';

const inquireBillService = async (payload: InquireBillPayloadProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return saveBillMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.IQUIRE_BILL(payload),
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
