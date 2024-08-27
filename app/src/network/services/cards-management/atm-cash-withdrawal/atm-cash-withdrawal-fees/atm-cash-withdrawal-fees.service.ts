import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../../cards-management.urls';
import { IAtmWithdrawalFeesRes } from './atm-cash-withdrawal-fees.interface';

const getAtmWithdrawalFees = async (
  walletNumber: string,
  amount: string,
): Promise<ApiResponse<IAtmWithdrawalFeesRes>> => {
  const apiResponse = await apiCall<IAtmWithdrawalFeesRes>({
    endpoint: CARDS_MANAGEMENT_URLS.atm_withdrawal_fees(walletNumber, amount),
    method: requestType.GET,
  });
  return apiResponse;
};

export default getAtmWithdrawalFees;
