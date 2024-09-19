import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AlinmaExpressTransactionsResponse } from './get-alinma_express_transactions.interface';
import alinmaExpressTransactions from './get-alinma_express_transactions.mock';

const getAlinmaExpressTransactions = async (): Promise<AlinmaExpressTransactionsResponse | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return alinmaExpressTransactions;
  }
  try {
    const apiResponse: ApiResponse<AlinmaExpressTransactionsResponse> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.get_alinma_express_transactions(),
      method: requestType.GET,
    });

    return apiResponse?.response;
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default getAlinmaExpressTransactions;
