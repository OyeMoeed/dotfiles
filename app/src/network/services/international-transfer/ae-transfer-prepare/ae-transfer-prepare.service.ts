import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AETransferPreparePayload, AETransferPrepareProps } from './ae-transfer-prepare.interface';
import aeTransferPrepareMock from './ae-transfer-prepare.mock';

const alinmaExpressTransferPrepare = async (
  walletNumber: string,
  payload: AETransferPreparePayload,
): Promise<AETransferPrepareProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return aeTransferPrepareMock;
  }
  try {
    const apiResponse: ApiResponse<AETransferPrepareProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.alinma_express_transfer()}/${walletNumber ?? ''}/express/transfer/prepare`,
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

export default alinmaExpressTransferPrepare;
