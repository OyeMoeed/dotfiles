import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { ConfirmIdRenewalProp, PrepareIdRenewalProp } from './id-renewal.interface';
import getWalletInfoMock from './id-renewal.mock';

const prepareRenewId = async (payload: PrepareIdRenewalProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getWalletInfoMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.PREPARE_ID_RENEWAL(payload?.walletNumber),
      method: requestType.POST,
      payload: payload?.deviceInfo,
    });

    if (apiResponse?.data?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

const confirmRenewId = async (payload: ConfirmIdRenewalProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getWalletInfoMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.CONFIRM_ID_RENEWAL(payload?.walletNumber),
      method: requestType.POST,
      payload: payload.confirmBody,
    });

    if (apiResponse?.data?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export { confirmRenewId, prepareRenewId };
