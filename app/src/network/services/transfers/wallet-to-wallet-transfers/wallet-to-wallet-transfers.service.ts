import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import TRANSFERS_URLS from '../transfer.urls';
import { WalletNumberProp } from './wallet-to-wallet-transfer.interface';
import walletToWalletTransferMock from './wallet-to-wallet-transfer.mock';

const getWalletToWalletTransfers = async (payload: WalletNumberProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return walletToWalletTransferMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: TRANSFERS_URLS.GET_WALLET_TO_WALLET_TRANSFERS(payload.walletNumber),
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

export default getWalletToWalletTransfers;
