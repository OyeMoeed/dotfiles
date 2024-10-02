import constants from '@app/constants/constants';
import musanedInquiryMock from './transfer-to-musaned-prepare.mock';
import {
  TransferToMusanedPrepareMockProps,
  TransferToMusanedPrepareReqParams,
  TransferToMusanedPrepareReqPayload,
} from './transfer-to-musaned-prepare.interface';
import apiCall from '../../api-call.service';
import MUSANED_URLS from '../musaned.urls';
import { ApiResponse } from '../../services.interface';

const transferToMusanedPrepare = async (
  params: TransferToMusanedPrepareReqParams,
  payload: TransferToMusanedPrepareReqPayload,
): Promise<TransferToMusanedPrepareMockProps> => {
  const { walletNumber } = params;
  if (constants.MOCK_API_RESPONSE) {
    return musanedInquiryMock;
  }

  try {
    const apiResponse: ApiResponse<TransferToMusanedPrepareMockProps> = await apiCall({
      endpoint: MUSANED_URLS.TRANSFER_TO_MUSANED_PREPARE(walletNumber),
      method: 'POST',
      payload,
    });

    if (apiResponse?.status) {
      return apiResponse;
    }
    return { ...apiResponse?.response, apiResponseNotOk: true };
  } catch (error) {
    return { error: { error: error.message } || 'Unknown error' };
  }
};

export default transferToMusanedPrepare;
