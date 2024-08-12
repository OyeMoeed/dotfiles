import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { IRedeemPointsPrepareReq, IRedeemPointsPrepareRes } from './redeem-points-prepare.interface';
import constants from '@app/constants/constants';
import preparePointMock from './redeem-points-prepare.mock';

const redeemPointsPrepare = async (
  walletNumber: string,
  body: IRedeemPointsPrepareReq,
): Promise<ApiResponse<IRedeemPointsPrepareRes>> => {
  try {

    if(constants.MOCK_API_RESPONSE){
      return preparePointMock
    }

    const apiResponse = await apiCall<IRedeemPointsPrepareRes>({
      endpoint: CARDS_MANAGEMENT_URLS.redeem_points_prepare(walletNumber),
      method: requestType.POST,
      payload: body,
    });
    return apiResponse;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export default redeemPointsPrepare;
