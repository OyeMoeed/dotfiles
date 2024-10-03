import constants from '@app/constants/constants';
import musanedInquiryMock from './transfer-to-musaned-confirm.mock';
import {
  TransferToMusanedConfirmMockProps,
  TransferToMusanedConfirmReqParams,
  TransferToMusanedConfirmReqPayload,
} from './transfer-to-musaned-confirm.interface';
import apiCall from '../../api-call.service';
import MUSANED_URLS from '../musaned.urls';
import { ApiResponse } from '../../services.interface';

const transferToMusanedConfirm = async (
  params: TransferToMusanedConfirmReqParams,
  payload: TransferToMusanedConfirmReqPayload,
): Promise<ApiResponse<TransferToMusanedConfirmMockProps> | undefined | TransferToMusanedConfirmMockProps> => {
  const { walletNumber } = params;
  if (constants.MOCK_API_RESPONSE) {
    return musanedInquiryMock;
  }

  const apiResponse = await apiCall<TransferToMusanedConfirmMockProps>({
    endpoint: MUSANED_URLS.TRANSFER_TO_MUSANED_CONFIRM(walletNumber),
    method: 'POST',
    payload,
  });

  return apiResponse;
};

export default transferToMusanedConfirm;
