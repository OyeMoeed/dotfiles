import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import preparePurchaseMock from './prepare-purchase.mock';
import { PreparePurchasePayloadProps } from './prepare-purhase.interface';

const preparePurchase = async (payload: PreparePurchasePayloadProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return preparePurchaseMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: MARKET_URLS.PREPARE_PURCHASE,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default preparePurchase;
