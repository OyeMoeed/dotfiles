import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import PHYSICAL_CARD_URLS from '../physical-card.urls';
import { PrintCardPayloadTypes, PrintCardResponseTypes } from './print-card.interface';
import printCardMockResponse from './print-card.mock';

const printCardService = async (
  walletNumber: string,
  payload: PrintCardPayloadTypes,
): Promise<PrintCardResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return printCardMockResponse;
  }

  const apiResponse: ApiResponse<PrintCardResponseTypes> = await apiCall({
    endpoint: PHYSICAL_CARD_URLS.print_card(walletNumber),
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export default printCardService;
