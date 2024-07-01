import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import transactionMock from '@app/network/services/core/transaction/transaction.mock';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { WalletNumberProp } from './transaction.interface';

const getTransactions = async (payload: WalletNumberProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return transactionMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.GET_TRANSACTIONS(payload.walletNumber),
      method: requestType.GET,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getTransactions;
