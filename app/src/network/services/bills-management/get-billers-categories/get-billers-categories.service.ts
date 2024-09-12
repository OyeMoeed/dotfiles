import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { GetBillersCategoriesResponseTypes } from './get-billers-categories.interface';
import getBillersCategoriesMockResponse from './get-billers-categories.mock';

const getBillersCategoriesService = async (): Promise<GetBillersCategoriesResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return getBillersCategoriesMockResponse;
  }
  try {
    const apiResponse: GetBillersCategoriesResponseTypes = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.get_billers_categories(),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getBillersCategoriesService;
