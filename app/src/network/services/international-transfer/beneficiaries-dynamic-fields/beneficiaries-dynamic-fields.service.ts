import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { BeneficiariesDynamicFieldsReq, DynamicFieldsResponse } from './beneficiaries-dynamic-fields.interface';
import { beneficiariesAEDynamicFieldsMock, beneficiariesDynamicFieldsMock } from './beneficiaries-dynamic-fields.mock';

const getBeneficiariesDynamicFields = async (
  payload: BeneficiariesDynamicFieldsReq,
): Promise<ApiResponse<DynamicFieldsResponse> | undefined> => {
  const { beneficiaryType, remittanceType, currencyCode, countryCode } = payload;
  if (constants.MOCK_API_RESPONSE) {
    if (beneficiaryType === 'westernUnion') {
      return beneficiariesDynamicFieldsMock;
    }
    return beneficiariesAEDynamicFieldsMock;
  }
  const apiResponse: ApiResponse<DynamicFieldsResponse> | undefined = await apiCall({
    endpoint:
      `${INTERNATIONAL_TRANSFERS_URLS.get_beneficiaries_dynamic_fields()}` +
      `${beneficiaryType ? `?beneficiary-type=${beneficiaryType}` : ''}` +
      `${remittanceType ? `&remittance-type=${remittanceType}` : ''}` +
      `${currencyCode ? `&currency-code=${currencyCode}` : ''}` +
      `${countryCode ? `&country-code=${countryCode}` : ''}`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getBeneficiariesDynamicFields;
