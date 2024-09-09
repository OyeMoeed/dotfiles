import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';

const getFAQ = async (): Promise<unknown> => {
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.FAQ,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getFAQ;
