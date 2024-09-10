import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';

const getGeocode = async (latitude: number, longitude: number): Promise<any> => {
  if (constants.MOCK_API_RESPONSE) {
    return {
      results: [
        {
          formatted_address: 'Mock Address',
        },
      ],
    };
  }

  const apiResponse = await apiCall({
    endpoint: CORE_URLS.GEOCODING(latitude.toString(), longitude.toString()),
    method: requestType.GET,
  });

  return apiResponse;
};

export default getGeocode;
