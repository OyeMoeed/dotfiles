import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import WUBeneficiaryDetailsMetaDataProps from './wu-beneficiary-details-metadata.interface';
import wuBeneficiaryDetailsMetaDataMock from './wu-beneficiary-details-metadata.mock';

const getWUBeneficiaryInfoMetaData = async (beneficiaryCode: string): Promise<WUBeneficiaryDetailsMetaDataProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return wuBeneficiaryDetailsMetaDataMock;
  }
  try {
    const apiResponse: ApiResponse<WUBeneficiaryDetailsMetaDataProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/metadata`,
      method: requestType.GET,
    });

    if (apiResponse?.response?.ok) {
      return apiResponse.response;
    }
    return { apiResponseNotOk: true, ...apiResponse?.response };
  } catch (error) {
    return { error: error?.message || 'Unknown error' };
  }
};

export default getWUBeneficiaryInfoMetaData;
