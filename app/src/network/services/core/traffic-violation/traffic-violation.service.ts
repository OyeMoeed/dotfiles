import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import trafficVoilationMock from './traffic-violation.mock';

const getTrafficViolationData = async (): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return trafficVoilationMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.GET_TRAFIC_VIOLATION,
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getTrafficViolationData;
