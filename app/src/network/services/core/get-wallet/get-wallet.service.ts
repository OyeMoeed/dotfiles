import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { GetWalletDataProps, WalletNumberProp } from './get-wallet.interface';
import getWalletInfoMock from './get-wallet.mock';

const getWalletInfo = async (payload: WalletNumberProp): Promise<GetWalletDataProps> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = getWalletInfoMock;
    return response;
  }
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_WALLET(payload?.walletNumber),
    method: requestType.GET,
    headers: {
      hide_error_response: payload?.hideError ?? false,
      hide_spinner_loading: payload?.hideSpinner ?? false,
    },
  });

  return apiResponse;
};

export default getWalletInfo;
