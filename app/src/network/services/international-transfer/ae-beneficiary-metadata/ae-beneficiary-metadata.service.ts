import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '@network/services/services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { AEBeneficiaryMetaDataInterface } from './ae-beneficiary-metadata.interface';
import aeBeneficiaryMetaDataMock from './ae-beneficiary-metadata.mock';

const getAEBeneficiaryMetaData = async (): Promise<ApiResponse<AEBeneficiaryMetaDataInterface> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return aeBeneficiaryMetaDataMock;
  }
  const apiResponse: ApiResponse<AEBeneficiaryMetaDataInterface> | undefined = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.alinma_express_beneficiaries_metadata,
    method: requestType.GET,
  });
  return apiResponse;
};

export default getAEBeneficiaryMetaData;
