import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../../bills-management.urls';
import { GetChildLovsParams, GetChildLovsResponseTypes } from './get-dynamic-fields-lov.interface';
import nestedLOVList from './get-dynamic-fields-lov.mock';

const getDynamicFieldLovList = async (params: GetChildLovsParams): Promise<GetChildLovsResponseTypes | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return nestedLOVList;
  }

  try {
    const apiResponse = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.get_child_lovs(params.lovType, params.filter1),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse as GetChildLovsResponseTypes;
    }

    return undefined;
  } catch (error: any) {
    return undefined;
  }
};

export default getDynamicFieldLovList;
