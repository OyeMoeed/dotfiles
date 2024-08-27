import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import LocalBeneficiaryMetaMockProps from './local-beneficiary-metadata.interface';
import localBeneficiaryMetaDataMock from './local-beneficiary-metadata.mock';

const getlocalBeneficiaryMetaData = async (): Promise<LocalBeneficiaryMetaMockProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return localBeneficiaryMetaDataMock;
  }
  try {
    const apiResponse: ApiResponse<LocalBeneficiaryMetaMockProps> = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.get_local_transfer_beneficiaries_metadata(),
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

export default getlocalBeneficiaryMetaData;
