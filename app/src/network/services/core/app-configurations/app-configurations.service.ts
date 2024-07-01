import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import appConfigurationsMock from './app-configurations.mock';

const appConfigurations = async (): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return appConfigurationsMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.APP_CONFIGURATIONS,
      method: requestType.POST,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true, apiResponse };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default appConfigurations;
