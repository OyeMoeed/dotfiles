import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { WUBanksResponseInterface, WUBeneficiaryBanksParam } from './wu-beneficiary-banks.interface';

const getWUBanks = async (
  payload: WUBeneficiaryBanksParam,
): Promise<ApiResponse<WUBanksResponseInterface> | undefined> => {
  const { currency, countryCode } = payload;

  const apiResponse: ApiResponse<WUBanksResponseInterface> | undefined = await apiCall({
    endpoint: `${INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_countries()}/${countryCode}/currencies/${currency}/banks`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getWUBanks;
