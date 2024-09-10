import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import transactionMock from '@app/network/services/core/transaction/transaction.mock';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { CardListResponse, CardsProp, TransactionsProp, changeStatusProp, getCardDetailsProp, prepareShowDetailsProp, resetPinCodeProp } from './transaction.interface';
import cardsListMock from './cards-list.mock';
import { APIResponseType } from '@app/utilities/enums.util';

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
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.GET_CARDS(payload?.walletNumber),
      method: requestType.GET,
      headers: {
        'api-version': 'v2',
      },
    });

    return cardsListMock;
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};



const resetPinCode = async (payload: resetPinCodeProp): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.RESET_PINCODE(payload?.walletNumber, payload?.cardIndex),
      method: requestType.POST,
      payload: payload?.body
    });
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};



const changeStatus = async (payload: changeStatusProp): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.ACTIVATE_ONLINE_PURCHASE(payload?.walletNumber),
      method: requestType.POST,
      payload: payload?.body
    });
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};


const prepareResetCardPinCode = async (payload: resetPinCodeProp): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.PREPARE_CARD_RESET(payload?.walletNumber, payload?.cardIndex),
      method: requestType.POST,
      payload: payload?.body
    });
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};



const prepareShowCardDetails = async (payload: prepareShowDetailsProp): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.PREPARE_SHOW_DETAILS(payload?.walletNumber),
      method: requestType.POST,
      payload: payload?.body
    });
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

const otpGetCardDetails = async (payload: getCardDetailsProp): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.OTP_GET_CARD_DETAILS(payload?.walletNumber),
      method: requestType.POST,
      payload: payload?.body
    });
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export { getCards, getTransactionTypes, getTransactions, resetPinCode, changeStatus, prepareResetCardPinCode, prepareShowCardDetails, otpGetCardDetails };
