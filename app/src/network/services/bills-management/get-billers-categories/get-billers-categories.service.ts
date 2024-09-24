import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { BillersCategoryType } from './get-billers-categories.interface';
import getBillersCategoriesMockResponse from './get-billers-categories.mock';

const getBillersCategoriesService = async (): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getBillersCategoriesMockResponse;
  }

  try {
    const apiResponse: ApiResponse<{ billerCategoryList: BillersCategoryType[] }> | undefined = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.get_billers_categories(),
      method: requestType.GET,
    });

    return apiResponse;
  } catch (error: any) {
    // Catch block to handle any errors that occur during the API call
    return { error: error.message || 'Unknown error' };
  }
};

export default getBillersCategoriesService;
