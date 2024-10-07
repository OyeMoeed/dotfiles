import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import transactionMock from '@app/network/services/core/transaction/transaction.mock';
import { APIResponseType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import {
  TransactionsProp,
  changeStatusProp,
  generateInvoiceProps,
  getCardDetailsProp,
  prepareRenewCardProp,
  prepareShowDetailsProp,
  renewCardProp,
  resetPinCodeProp,
  TransactionsMockProps,
} from './transaction.interface';

const getTransactions = async (payload: TransactionsProp, hideSpinner = true): Promise<TransactionsMockProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return transactionMock;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_HOME_TRANSACTIONS(payload),
    method: requestType.GET,
    headers: {
      hide_spinner_loading: hideSpinner,
    },
  });
  return apiResponse;
};

const getTransactionTypes = async ({ hideSpinner }: { hideSpinner?: boolean }): Promise<unknown> => {
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_TRANSACTION_TYPES,
    method: requestType.GET,
    headers: {
      hide_spinner_loading: hideSpinner,
    },
  });

  return apiResponse;
};

const resetPinCode = async (payload: resetPinCodeProp): Promise<any> => {
  const apiResponse = await apiCall({
    endpoint: CORE_URLS.RESET_PINCODE(payload?.walletNumber, payload?.cardIndex),
    method: requestType.POST,
    payload: payload?.body,
  });

  return apiResponse;
};

const changeStatus = async (payload: changeStatusProp): Promise<any> => {
  const apiResponse = await apiCall({
    endpoint: CORE_URLS.ACTIVATE_ONLINE_PURCHASE(payload?.walletNumber),
    method: requestType.POST,
    payload: payload?.body,
  });
  return apiResponse;
};

const prepareResetCardPinCode = async (payload: resetPinCodeProp): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.PREPARE_CARD_RESET(payload?.walletNumber, payload?.cardIndex),
      method: requestType.POST,
      payload: payload?.body,
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
  const apiResponse = await apiCall({
    endpoint: CORE_URLS.PREPARE_SHOW_DETAILS(payload?.walletNumber),
    method: requestType.POST,
    payload: payload?.body,
  });

  return apiResponse;
};

const otpGetCardDetails = async (payload: getCardDetailsProp): Promise<any> => {
  const apiResponse = await apiCall({
    endpoint: CORE_URLS.OTP_GET_CARD_DETAILS(payload?.walletNumber),
    method: requestType.POST,
    payload: payload?.body,
  });

  return apiResponse;
};

const otpRenewCard = async (payload: renewCardProp): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.OTP_RENEW_CARD(payload?.walletNumber),
      method: requestType.POST,
      payload: payload?.body,
    });
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

const prepareRenewCard = async (payload: prepareRenewCardProp): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.PREPARE_RENEW_CARD(payload?.walletNumber),
      method: requestType.POST,
      payload: payload?.body,
    });
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

const generateInvoice = async (payload: generateInvoiceProps): Promise<any> => {
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.GENERATE_INVOICE(payload?.walletNumber, payload?.trxId, payload?.trxDate),
      method: requestType.GET,
    });
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export * from './get-cards';
export {
  changeStatus,
  getTransactionTypes,
  getTransactions,
  otpGetCardDetails,
  otpRenewCard,
  prepareRenewCard,
  prepareResetCardPinCode,
  prepareShowCardDetails,
  resetPinCode,
  generateInvoice,
};
