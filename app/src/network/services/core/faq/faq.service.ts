import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import constants from '@app/constants/constants';
import { helpCenterMockData } from '@app/assets/mocks/help-center.mock';

const getFAQ = async (hideError: boolean = false): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return helpCenterMockData;
  }
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.FAQ,
    method: requestType.GET,
    headers: {
      hide_error_response: hideError,
    },
  });
  return apiResponse;
};

export default getFAQ;
