import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import TRANSFERS_URLS from '../transfer.urls';
import { TransferDetailsMockProps, TransferDetailsPayload } from './transfer-details.interface';
import transferDetailsMock from './transfer-details.mock';

const getWalletToWalletTransferDetails = async (
  walletNumber: string,
  payload: TransferDetailsPayload,
): Promise<TransferDetailsMockProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return transferDetailsMock;
  }
  try {
    const apiResponse: ApiResponse<TransferDetailsMockProps> = await apiCall({
      endpoint: TRANSFERS_URLS.get_wallet_to_wallet_transfer(walletNumber),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status) {
      return apiResponse?.response;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getWalletToWalletTransferDetails;
