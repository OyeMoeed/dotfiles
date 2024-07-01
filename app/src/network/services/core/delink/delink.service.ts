import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { DeviceInfoProps } from './delink-device.interface';
import delinkDeviceMock from './delink.mock';

const deviceDelink = async (payload: DeviceInfoProps): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return delinkDeviceMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.DEVICE_DELINK,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true, apiResponse };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default deviceDelink;
