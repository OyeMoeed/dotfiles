import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { BeneficiaryCurrenciesReq, WuRemittanceTypesResponseInterface } from './wu-remittance-types.interface';
import wuRemittanceTypesMock from './wu-remittance-types.mock';

const getWURemittanceTypes = async (
  payload: BeneficiaryCurrenciesReq,
): Promise<ApiResponse<WuRemittanceTypesResponseInterface> | undefined> => {
  const { countryCode, currencyCode } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return wuRemittanceTypesMock;
  }
  const apiResponse: ApiResponse<WuRemittanceTypesResponseInterface> | undefined = await apiCall({
    endpoint: `${INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_countries()}/${countryCode}/currencies/${currencyCode}/remittanceTypes`,
    method: requestType.GET,
  });

  return apiResponse;
};

export default getWURemittanceTypes;
