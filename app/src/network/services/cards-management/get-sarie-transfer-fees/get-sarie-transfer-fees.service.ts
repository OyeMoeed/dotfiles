import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';

import { GetSarieTransferFeesResponseTypes } from './get-sarie-transfer-fees.interface';
import GetSarieTransferFeesMockResponse from './get-sarie-trasnfer-fees.mock';

const getSarieTransferFees = async (
  walletNumber: string,
  bankCode: string,
  amount: string,
): Promise<GetSarieTransferFeesResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return GetSarieTransferFeesMockResponse;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CARDS_MANAGEMENT_URLS.get_sarie_transfer_fees(walletNumber, bankCode, amount),
      method: requestType.GET,
    });

    if (apiResponse.successfulResponse) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getSarieTransferFees;
