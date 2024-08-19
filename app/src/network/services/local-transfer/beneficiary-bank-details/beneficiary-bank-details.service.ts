import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferBeneficiaryBankDetailsMock from './beneficiary-bank-details';
import { LocalTransferBeneficiaryBankDetailsReq } from './beneficiary-bank-details.interface';

const getlocalTransferBeneficiaryBankDetails = async (
  params: LocalTransferBeneficiaryBankDetailsReq,
): Promise<unknown> => {
  const { countryCode, bankCode, iban, beneficiaryType } = params;
  if (constants.MOCK_API_RESPONSE) {
    return localTransferBeneficiaryBankDetailsMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.GET_LOCAL_BENEFICIARIES_BANK_DETAILS(iban, countryCode, bankCode, beneficiaryType),
      method: requestType.GET,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getlocalTransferBeneficiaryBankDetails;
