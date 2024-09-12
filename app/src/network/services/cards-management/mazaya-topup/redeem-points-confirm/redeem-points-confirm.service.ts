import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponse } from '@app/network/services/services.interface';
import apiCall from '@network/services/api-call.service';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { IRedeemPointsConfirmReq, IRedeemPointsConfirmRes } from './redeem-points-confirm.interface';
import confirmPointMock from './redeem-points-confirm.mock';

const redeemPointsConfirm = async (
  walletNumber: string,
  body: IRedeemPointsConfirmReq,
): Promise<ApiResponse<IRedeemPointsConfirmRes> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return confirmPointMock as any;
  }

  const apiResponse = await apiCall<IRedeemPointsConfirmRes>({
    endpoint: CARDS_MANAGEMENT_URLS.redeem_points_confirm(walletNumber),
    method: requestType.POST,
    payload: body,
  });
  return apiResponse;
};

export default redeemPointsConfirm;
