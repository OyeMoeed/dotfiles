import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { WUTransferPayload, WUTransferProps } from './wu-transfer.interface';
import wuTransferMock from './wu-transfer.mock';

const westernUnionTransfer = async (beneficiaryCode: string, payload: WUTransferPayload): Promise<WUTransferProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return wuTransferMock;
  }
  try {
    const apiResponse: ApiResponse<WUTransferProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_transfer()}/${beneficiaryCode}/wu/transfer`,
      method: requestType.POST,
      payload,
    });
    if (apiResponse?.response?.ok) {
      return apiResponse?.response;
    }
    return { apiResponseNotOk: true, ...apiResponse };
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default westernUnionTransfer;
