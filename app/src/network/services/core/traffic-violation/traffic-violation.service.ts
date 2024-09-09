import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import trafficVoilationMock from './traffic-violation.mock';

const getTrafficViolationData = async (): Promise<typeof trafficVoilationMock> => {
  if (constants.MOCK_API_RESPONSE) {
    return trafficVoilationMock;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_TRAFIC_VIOLATION,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getTrafficViolationData;
