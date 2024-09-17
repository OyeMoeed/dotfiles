import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import { GetProductDetailsByProductIdPayloadProps } from './get-product-details-by-product-id.interface';
import getProductDetailsByProductIdMock from './get-product-details-by-product-id.mock';

const getProductDetailsByProductId = async (payload: GetProductDetailsByProductIdPayloadProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getProductDetailsByProductIdMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: MARKET_URLS.GET_PRODUCT_DETAILS_BY_PRODUCT_ID(payload?.marchantId, payload?.productId),
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

export default getProductDetailsByProductId;
