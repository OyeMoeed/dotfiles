import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponse } from '@app/network/services/services.interface';
import apiCall from '@network/services/api-call.service';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { IRedeemPointsPrepareReq, IRedeemPointsPrepareRes } from './redeem-points-prepare.interface';
import preparePointMock from './redeem-points-prepare.mock';

const redeemPointsPrepare = async (
  walletNumber: string,
  body: IRedeemPointsPrepareReq,
): Promise<ApiResponse<IRedeemPointsPrepareRes> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return preparePointMock as any;
  }

  const apiResponse = await apiCall<IRedeemPointsPrepareRes>({
    endpoint: CARDS_MANAGEMENT_URLS.redeem_points_prepare(walletNumber),
    method: requestType.POST,
    payload: body,
  });

  return apiResponse;
};

export default redeemPointsPrepare;
