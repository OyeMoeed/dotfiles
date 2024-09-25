import constantsNetwork from '@app/network/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';
import { IAPPLECRYPTOREQ } from './apple-pay-crypto.interface';

const applePayCrypto = async (walletNumber: string, body: IAPPLECRYPTOREQ): Promise<ApiResponse<any>> => {
  try {
    const apiResponse = await apiCall<any>({
      endpoint: CARDS_MANAGEMENT_URLS.apple_pay_crypto(walletNumber),
      method: requestType.POST,
      payload: body,
      headers: {
        [constantsNetwork.API_VERSION_NAME]: 'v2',
      },
    });
    return apiResponse as ApiResponse<any>;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };

    return {
      status,
      successfulResponse: false,
    };
  }
};

export default applePayCrypto;
