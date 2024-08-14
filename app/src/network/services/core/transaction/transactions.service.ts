import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import transactionMock from '@app/network/services/core/transaction/transaction.mock';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { CardsProp, TransactionsProp } from './transaction.interface';

const getTransactions = async (payload: TransactionsProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return transactionMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.GET_HOME_TRANSACTIONS(payload),
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

const getTransactionTypes = async (): Promise<unknown> => {
  try {
    let apiResponse: any = await apiCall({
      endpoint: CORE_URLS.GET_TRANSACTION_TYPES,
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === "SUCCESS") {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};



const getCards = async (payload: CardsProp): Promise<unknown> => {
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.GET_CARDS(payload?.walletNumber),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === "SUCCESS") {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export { getCards, getTransactionTypes, getTransactions };

