import constants from '@app/constants/constants';
import musanedInquiryMock from './transfer-to-musaned-confirm.mock';
import {
  TransferToMusanedConfirmMockProps,
  TransferToMusanedConfirmReqParams,
} from './transfer-to-musaned-confirm.interface';
import apiCall from '../../api-call.service';
import MUSANED_URLS from '../musaned.urls';
import { ApiResponse } from '../../services.interface';

const transferToMusanedConfirm = async (
  params: TransferToMusanedConfirmReqParams,
): Promise<TransferToMusanedConfirmMockProps> => {
  const { walletNumber } = params;
  if (constants.MOCK_API_RESPONSE) {
    return musanedInquiryMock;
  }

  try {
    const apiResponse: ApiResponse<TransferToMusanedConfirmMockProps> = await apiCall({
      endpoint: MUSANED_URLS.TRANSFER_TO_MUSANED_CONFIRM(walletNumber),
      method: 'POST',
    });

    if (apiResponse?.status) {
      return apiResponse;
    }
    return { ...apiResponse?.response, apiResponseNotOk: true };
  } catch (error) {
    return { error: { error: error.message } || 'Unknown error' };
  }
};

export default transferToMusanedConfirm;
