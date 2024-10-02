import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import WUBeneficiaryMetaDataProps from './wu-beneficiary-metadata.interface';
import wuBeneficiaryMetaDataMock from './wu-beneficiary-metadata.mock';

const getWUBeneficiaryMetaData = async (): Promise<WUBeneficiaryMetaDataProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return wuBeneficiaryMetaDataMock;
  }
  try {
    const apiResponse: ApiResponse<WUBeneficiaryMetaDataProps> = await apiCall({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_metadata(),
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

export default getWUBeneficiaryMetaData;
