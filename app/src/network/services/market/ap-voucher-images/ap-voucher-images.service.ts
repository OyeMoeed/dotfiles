import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import apVoucherImages from './ap-voucher-images.mock';

const getApVoucherImages = async (): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return apVoucherImages;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: MARKET_URLS.GET_AP_VOUCHER_IMAGES,
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

export default getApVoucherImages;