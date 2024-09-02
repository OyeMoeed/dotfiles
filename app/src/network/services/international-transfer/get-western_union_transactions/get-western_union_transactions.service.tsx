import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { WuTransactionsResponse } from './get-western_union_transactions.interface';
import wuTransactions from './get-western_union_transactions.mock';

const getWUTransactions = async () => {
  if (constants.MOCK_API_RESPONSE) {
    return wuTransactions;
  }
  try {
    const apiResponse: ApiResponse<WuTransactionsResponse> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.get_western_union_transactions(),
      method: requestType.POST,
    });

    return apiResponse?.response;
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default getWUTransactions;
