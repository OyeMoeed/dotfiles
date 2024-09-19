import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import { getShopOrderHistoryPayloadProps } from './get-shop-order-history.interface';
import getShopOrderHistoryMock from './get-shop-order-history.mock';

const getShopOrderHistory = async (payload: getShopOrderHistoryPayloadProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getShopOrderHistoryMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: MARKET_URLS.GET_SHOP_ORDER_HISTORY(payload?.walletNumber),
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

export default getShopOrderHistory;
