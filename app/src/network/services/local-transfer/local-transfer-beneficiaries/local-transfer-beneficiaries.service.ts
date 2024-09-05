import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferBeneficiariesMock from './local-transfer-beneficiaries';

const getlocalTransferBeneficiaries = async (): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferBeneficiariesMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: LOCAL_TRANSFERS_URLS.get_local_transfer_beneficiaries(),
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

export default getlocalTransferBeneficiaries;
