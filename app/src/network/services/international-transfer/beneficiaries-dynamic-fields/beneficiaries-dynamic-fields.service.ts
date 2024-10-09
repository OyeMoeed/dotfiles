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
  const { beneficiaryType, remittanceType, currencyCode, countryCode, bank } = payload;
  const correspondantBankCode =
    typeof bank === 'object' && 'correspondantBank' in bank ? bank?.correspondantBank : null;
  const bankCode = typeof bank === 'object' && 'code' in bank ? bank?.code : bank || null;
  const valueRemittanceType =
    typeof bank === 'object' && 'actualRemittanceType' in bank ? bank?.actualRemittanceType : remittanceType;
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
      `${valueRemittanceType ? `&remittance-type=${valueRemittanceType}` : ''}` +
      `${currencyCode ? `&currency-code=${currencyCode}` : ''}` +
      `${countryCode ? `&country-code=${countryCode}` : ''}` +
      `${bankCode ? `&bank-code=${bankCode}` : ''}` +
      `${correspondantBankCode ? `&correspondant-bank-code=${correspondantBankCode}` : ''}`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getBeneficiariesDynamicFields;