import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { BeneficiaryBankDetailsReq, LocalTransferBeneficiaryBankMockProps } from './beneficiary-bank-details.interface';
import localTransferBeneficiaryBankDetailsMock from './beneficiary-bank-details.mock';

const getlocalTransferBeneficiaryBankDetails = async (
  params: BeneficiaryBankDetailsReq,
): Promise<LocalTransferBeneficiaryBankMockProps> => {
  const { countryCode, bankCode, iban, beneficiaryType }: BeneficiaryBankDetailsReq = params;
  const paramsUrl = `${iban}?country-code=${countryCode}&bank-code=${bankCode}&beneficiary-type=${beneficiaryType}`;
  if (constants.MOCK_API_RESPONSE) {
    return localTransferBeneficiaryBankDetailsMock;
  }
  try {
    const apiResponse: ApiResponse<LocalTransferBeneficiaryBankMockProps> = await apiCall({
      endpoint: `${LOCAL_TRANSFERS_URLS.get_local_beneficiaries_bank_details()}${paramsUrl}`,
      method: requestType.GET,
    });

    if (apiResponse?.response?.ok) {
      return apiResponse?.response;
    }
    return { apiResponseNotOk: true, apiResponse };
  } catch (error) {
    const { response } = error;
    return response || 'Unknown error';
  }
};

export default getlocalTransferBeneficiaryBankDetails;
