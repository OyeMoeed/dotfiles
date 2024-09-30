import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { GetBillersServicesResponseTypes } from './get-billers-services.interface';
import getBillersServicesMockResponse from './get-billers-services.mock';

const getBillersServiceProvider = async (billerID: string | number): Promise<GetBillersServicesResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return getBillersServicesMockResponse;
  }
  try {
    const apiResponse: GetBillersServicesResponseTypes = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.get_billers_services(billerID),
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

export default getBillersServiceProvider;
