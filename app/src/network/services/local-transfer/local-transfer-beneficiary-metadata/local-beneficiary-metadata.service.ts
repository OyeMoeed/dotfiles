import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localBeneficiaryMetaDataMock from './local-beneficiary-metadata';

const getlocalBeneficiaryMetaData = async (): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return localBeneficiaryMetaDataMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.GET_LOCAL_TRANSFER_BENEFICIARIES_METADATA(),
      method: requestType.GET,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default getlocalBeneficiaryMetaData;
