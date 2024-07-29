import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { WalletNumberProp } from './get-wallet.interface';
import getWalletInfoMock from './get-wallet.mock';

const getWalletInfo = async (payload: WalletNumberProp, dispatch: (action: any) => void): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = getWalletInfoMock;
    dispatch(setWalletInfo(response?.response));
    return response;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.GET_WALLET(payload?.walletNumber),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      dispatch(setWalletInfo(apiResponse?.response));
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getWalletInfo;
