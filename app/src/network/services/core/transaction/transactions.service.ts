import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import transactionMock from '@app/network/services/core/transaction/transaction.mock';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import cardsListMock from './cards-list.mock';
import { CardsProp, TransactionsProp } from './transaction.interface';

const getTransactions = async (payload: TransactionsProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return transactionMock;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_HOME_TRANSACTIONS(payload),
    method: requestType.GET,
  });
  return apiResponse;
};

const getTransactionTypes = async (): Promise<unknown> => {
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_TRANSACTION_TYPES,
    method: requestType.GET,
  });

  return apiResponse;
};

const getCards = async (payload: CardsProp): Promise<any> => {
  if (constants.MOCK_API_RESPONSE) {
    return cardsListMock;
  }
  const apiResponse = await apiCall({
    endpoint: CORE_URLS.GET_CARDS(payload?.walletNumber),
    method: requestType.GET,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'api-version': 'v2',
    },
  });
  return apiResponse;
};

export { getCards, getTransactions, getTransactionTypes };
