import { helpCenterMockData } from '@app/assets/mocks/help-center.mock';
import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { ApiResponse, UseFaqPayload } from './faq.interface';

const getFAQ = async (payload?: UseFaqPayload): Promise<ApiResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return helpCenterMockData;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.FAQ,
    method: requestType.GET,
    headers: {
      hide_error_response: payload?.hideError || false,
      hide_spinner_loading: payload?.hideSpinner || false,
    },
  });
  return apiResponse;
};

export default getFAQ;
