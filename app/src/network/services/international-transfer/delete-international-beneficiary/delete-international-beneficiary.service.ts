import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import AlinmaExpressBeneficiariesProps from './delete-international-beneficiary.interface';
import deleteBeneficiariesData from './delete-international-beneficiary.mock';

const deleteInternationalBeneficiary = async (
  beneficiaryCode: string,
): Promise<AlinmaExpressBeneficiariesProps | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return deleteBeneficiariesData;
  }

  const apiResponse: ApiResponse<AlinmaExpressBeneficiariesProps> = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.delete_beneficiary(beneficiaryCode),
    method: requestType.DELETE,
  });

  return apiResponse?.response;
};

export default deleteInternationalBeneficiary;
