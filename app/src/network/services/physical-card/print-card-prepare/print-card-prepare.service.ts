import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import PHYSICAL_CARD_URLS from '../physical-card.urls';
import { PrintCardPreparePayloadTypes, PrintCardPrepareResponseTypes } from './print-card-prepare.interface';
import printCardPrepareMockResponse from './print-card-prepare.mock';

const printCardPrepareService = async (
  walletNumber: string,
  payload: PrintCardPreparePayloadTypes,
): Promise<PrintCardPrepareResponseTypes> => {
  if (constants.MOCK_API_RESPONSE) {
    return printCardPrepareMockResponse;
  }

  const apiResponse: ApiResponse<PrintCardPrepareResponseTypes> = await apiCall({
    endpoint: PHYSICAL_CARD_URLS.print_card_prepare(walletNumber),
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export default printCardPrepareService;
