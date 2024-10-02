import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import appConfigurationsMock from './app-configurations.mock';

const appConfigurations = async (): Promise<object | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return appConfigurationsMock;
  }

  const apiResponse = await apiCall({
    endpoint: CORE_URLS.APP_CONFIGURATIONS,
    method: requestType.POST,
    headers: {
      hide_spinner_loading: true,
    },
  });

  return apiResponse;
};

export default appConfigurations;
