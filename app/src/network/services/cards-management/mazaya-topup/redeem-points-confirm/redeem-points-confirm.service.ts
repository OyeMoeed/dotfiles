import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { IRedeemPointsConfirmReq, IRedeemPointsConfirmRes } from './redeem-points-confirm.interface';
import constants from '@app/constants/constants';
import confirmPointMock from './redeem-points-confirm.mock';

const redeemPointsConfirm = async (
  walletNumber: string,
  body: IRedeemPointsConfirmReq,
): Promise<ApiResponse<IRedeemPointsConfirmRes>> => {
  try {
    if (constants.MOCK_API_RESPONSE) {
      return confirmPointMock;
    }

    const apiResponse = await apiCall<IRedeemPointsConfirmRes>({
      endpoint: CARDS_MANAGEMENT_URLS.redeem_points_confirm(walletNumber),
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

export default redeemPointsConfirm;
