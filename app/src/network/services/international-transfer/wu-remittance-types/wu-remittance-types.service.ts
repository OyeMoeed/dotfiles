import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { BeneficiaryCurrenciesReq, WuRemittanceTypesProps } from './wu-remittance-types.interface';
import wuRemittanceTypesMock from './wu-remittance-types.mock';

const getWURemittanceTypes = async (payload: BeneficiaryCurrenciesReq): Promise<WuRemittanceTypesProps> => {
  const { countryCode, currencyCode } = payload;
  if (constants.MOCK_API_RESPONSE) {
    return wuRemittanceTypesMock;
  }
  try {
    const apiResponse: ApiResponse<WuRemittanceTypesProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_countries()}/${countryCode}/currencies/${currencyCode}/remittanceTypes`,
      method: requestType.GET,
    });

    if (apiResponse?.successfulResponse) {
      return apiResponse;
    }
    return { apiResponseNotOk: true, ...apiResponse?.response };
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default getWURemittanceTypes;
