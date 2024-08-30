import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AEBeneficiaryBanksParam, AEBeneficiaryBanksProps } from './ae-beneficiary-banks.interface';
import aeBeneficiaryBanksMock from './ae-beneficiary-banks.mock';

const getAEBeneficiaryBanks = async (payload: AEBeneficiaryBanksParam): Promise<AEBeneficiaryBanksProps> => {
  const { alinmaExpressType, countryCode } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return aeBeneficiaryBanksMock;
  }
  try {
    const apiResponse: ApiResponse<AEBeneficiaryBanksProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.alinma_express()}/${alinmaExpressType}/countries/${countryCode}/banks`,
      method: requestType.GET,
    });

    if (apiResponse?.response?.ok) {
      return apiResponse?.response;
    }
    return { apiResponseNotOk: true, ...apiResponse?.response };
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default getAEBeneficiaryBanks;
