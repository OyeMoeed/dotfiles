import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AETransferConfirmPayload, AETransferConfirmProps } from './ae-transfer-confirm.interface';
import aeTransferConfirmMock from './ae-transfer-confirm.mock';

const alinmaExpressTransferConfirm = async (
  walletNumber: string,
  payload: AETransferConfirmPayload,
): Promise<AETransferConfirmProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return aeTransferConfirmMock;
  }
  try {
    const apiResponse: ApiResponse<AETransferConfirmProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.alinma_express_transfer()}/${walletNumber ?? ''}/express/transfer/confirm`,
      method: requestType.POST,
      payload,
    });
    if (apiResponse?.response?.ok) {
      return apiResponse?.response;
    }
    return { apiResponseNotOk: true, ...apiResponse };
  } catch (error: any) {
    return { error: error || 'Unknown error' };
  }
};

export default alinmaExpressTransferConfirm;
