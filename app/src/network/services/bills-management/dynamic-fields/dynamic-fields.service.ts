import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { GetDynamicFieldsResponseTypes } from './dynamic-fields.interface';
import { getDynamicFieldsMockResponse, getDynamicFieldsMockResponseByID } from './dynamic-fields.mock';

const getDynamicFieldsService = async (
  billerId: string,
  serviceId: string,
  walletNumber: string,
  payload,
): Promise<GetDynamicFieldsResponseTypes | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    if (payload) {
      return getDynamicFieldsMockResponse;
    }
    return getDynamicFieldsMockResponseByID;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.get_dynamic_fields(billerId, serviceId, walletNumber),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse as GetDynamicFieldsResponseTypes;
    }

    return undefined;
  } catch (error: any) {
    return undefined;
  }
};

export default getDynamicFieldsService;
