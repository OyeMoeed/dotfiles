import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import apVoucherMarchantsCategory from './ap-voucher-marchants-category.mock';
import { PayloadMerchantsCategoryProps } from './ap-voucher-marchats-category.interface';

const getApVoucherMatchantsCategory = async (payload: PayloadMerchantsCategoryProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return apVoucherMarchantsCategory;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: MARKET_URLS.GET_AP_VOUCHER_MERCHANTS_CATEGORY(payload?.categoryId),
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

export default getApVoucherMatchantsCategory;
