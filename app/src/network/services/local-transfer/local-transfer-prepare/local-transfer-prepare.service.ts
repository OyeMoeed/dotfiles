import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';

import {
  LocalTransferPreparePayloadTypes,
  LocalTransferPrepareResponseTypes,
} from './local-transfer-prepare.interface';
import LocalTransferPrepareMockResponse from './local-transfer-prepare.mock';

const localTransferPrepare = async (
  walletNumber: string,
  payload: LocalTransferPreparePayloadTypes,
): Promise<LocalTransferPrepareResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return LocalTransferPrepareMockResponse;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.LOCAL_TRANSFER_PREPARE(walletNumber),
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

export default localTransferPrepare;
