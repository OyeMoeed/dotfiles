import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import AEBeneficiaryMetaDataProps from './ae-beneficiary-metadata.interface';
import aeBeneficiaryMetaDataMock from './ae-beneficiary-metadata.mock';

const getAEBeneficiaryMetaData = async (): Promise<AEBeneficiaryMetaDataProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return aeBeneficiaryMetaDataMock;
  }
  try {
    const apiResponse: ApiResponse<AEBeneficiaryMetaDataProps> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.alinma_express_beneficiaries_metadata(),
      method: requestType.GET,
    });
    if (apiResponse?.response?.ok) {
      return apiResponse.response;
    }
    return { apiResponseNotOk: true, ...apiResponse?.response };
  } catch (error) {
    return { error: error || 'Unknown error' };
  }
};

export default getAEBeneficiaryMetaData;
