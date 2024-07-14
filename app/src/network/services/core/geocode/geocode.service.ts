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
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.GEOCODING(latitude, longitude),
      method: requestType.GET,
    });

    if (apiResponse?.ok) {
      return apiResponse.json();
    }
    return { error: 'API response not OK' };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getGeocode;
