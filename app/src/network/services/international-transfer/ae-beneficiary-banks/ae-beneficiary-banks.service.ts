import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AEBanksResponseInterface, AEBeneficiaryBanksParam } from './ae-beneficiary-banks.interface';
import aeBeneficiaryBanksMock from './ae-beneficiary-banks.mock';

const getAEBeneficiaryBanks = async (
  payload: AEBeneficiaryBanksParam,
): Promise<ApiResponse<AEBanksResponseInterface> | undefined> => {
  const { alinmaExpressType, countryCode } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return aeBeneficiaryBanksMock;
  }
  const apiResponse: ApiResponse<AEBanksResponseInterface> | undefined = await apiCall({
    endpoint: `${INTERNATIONAL_TRANSFERS_URLS.alinma_express}/alinma-express-types/${alinmaExpressType}/countries/${countryCode}/banks`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getAEBeneficiaryBanks;
