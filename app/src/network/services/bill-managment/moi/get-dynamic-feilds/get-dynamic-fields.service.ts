import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_URLS from '../../bills-urls';
import { MoiDynamicFieldsPayloadProps } from './get-dynamic-fields.interface';
import moiDynamicFieldsMock from './get-dynamic-fields.mock';

const getDynamicFields = async (payload: MoiDynamicFieldsPayloadProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = moiDynamicFieldsMock;
    return response;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: BILLS_URLS.GET_DYNAMIC_FIELD(payload),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getDynamicFields;
