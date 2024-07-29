import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { DelinkPayload } from './delink-device.interface';
import delinkDeviceMock from './delink.mock';

const deviceDelink = async (payload: DelinkPayload): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return delinkDeviceMock;
  }
  
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.DEVICE_DELINK(payload?.walletNumber),
      method: requestType.POST,
      payload: {
        deviceInfo: payload?.delinkReq
      },
    });

    if (apiResponse?.status?.type === "SUCCESS") {
      return apiResponse;
    }
    return { apiResponseNotOk: true, apiResponse };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default deviceDelink;
