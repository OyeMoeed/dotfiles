import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { WUTransactionDetailsResponse } from './get-western_union_transaction_details.interface';
import wuTransactiontResponseData from './get-western_union_transaction_details.mock';

const getAUTransactionDetails = async (
  moneyTransferControlNumber: string,
): Promise<WUTransactionDetailsResponse | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return wuTransactiontResponseData;
  }
  try {
    const apiResponse: ApiResponse<WUTransactionDetailsResponse> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.get_western_union_transactions_details(moneyTransferControlNumber),
      method: requestType.GET,
    });

    return apiResponse?.response;
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default getAUTransactionDetails;
