import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { IAtmWithdrawalConfirmReq, IAtmWithdrawalConfirmRes } from './atm-cash-withdrawal-confirm.interface';

const atmWithdrawalConfirm = async (
  walletNumber: string,
  payload: IAtmWithdrawalConfirmReq,
): Promise<ApiResponse<IAtmWithdrawalConfirmRes>> => {
  const apiResponse = await apiCall<IAtmWithdrawalConfirmRes>({
    endpoint: CARDS_MANAGEMENT_URLS.atm_withdrawal_confirm(walletNumber),
    method: requestType.POST,
    payload,
  });
  return apiResponse;
};

export default atmWithdrawalConfirm;
