import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import LocalTransferBeneficiariesMockProps from './local-transfer-beneficiaries.interface';
import localTransferBeneficiariesMock from './local-transfer-beneficiaries.mock';

const getlocalTransferBeneficiaries = async (): Promise<LocalTransferBeneficiariesMockProps | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return localTransferBeneficiariesMock;
  }

  const apiResponse: ApiResponse<LocalTransferBeneficiariesMockProps> | undefined = await apiCall({
    endpoint: LOCAL_TRANSFERS_URLS.get_local_transfer_beneficiaries(),
    method: requestType.GET,
    headers: {
      hide_error_response: true,
    },
  });

  return apiResponse;
};

export default getlocalTransferBeneficiaries;
