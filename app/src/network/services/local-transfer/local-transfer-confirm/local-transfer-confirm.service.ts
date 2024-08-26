import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';

import {
  LocalTransferConfirmPayloadTypes,
  LocalTransferConfirmResponseTypes,
} from './local-transfer-confirm.interface';
import LocalTransferConfirmMockResponse from './local-transfer-confirm.mock';

const localTransferConfirm = async (
  walletNumber: string,
  payload: LocalTransferConfirmPayloadTypes,
): Promise<LocalTransferConfirmResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return LocalTransferConfirmMockResponse;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.local_transfer_confirm(walletNumber),
      method: requestType.POST,
      payload,
    });

    if (apiResponse.successfulResponse) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default localTransferConfirm;
