import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import { PurchaseConfirmPayloadProps } from './purchase-confirm.interface';
import purchaseConfirmMock from './purchase-confirm.mock';

const purchaseConfirm = async (payload: PurchaseConfirmPayloadProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return purchaseConfirmMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: MARKET_URLS.CONFIRM_PURCHASE,
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

export default purchaseConfirm;
