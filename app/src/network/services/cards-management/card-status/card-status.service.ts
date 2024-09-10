import requestType from '@app/network/request-types.network';
import { ApiResponse } from '@app/network/services/services.interface';
import apiCall from '@network/services/api-call.service';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';
import { CardStatusReq, CardStatusRes } from './card-status.interface';

const changeCardStatus = async (walletNumber: string, body: CardStatusReq): Promise<ApiResponse<CardStatusRes>> => {
  const apiResponse: any = await apiCall<CardStatusRes>({
    endpoint: CARDS_MANAGEMENT_URLS.changeCardStatus(walletNumber),
    method: requestType.POST,
    payload: body,
  });
  return apiResponse;
};

export default changeCardStatus;
