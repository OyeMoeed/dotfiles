import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';
import { IAvailableCardsTypesRes } from './issue-card-types.interface';

const getAvailableCardsTypes = async (): Promise<ApiResponse<IAvailableCardsTypesRes>> => {
  try {
    const apiResponse = await apiCall<IAvailableCardsTypesRes>({
      endpoint: CARDS_MANAGEMENT_URLS.GET_CARDS_TYPES,
      method: requestType.GET,
    });
    return apiResponse as ApiResponse<IAvailableCardsTypesRes>;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export default getAvailableCardsTypes;
