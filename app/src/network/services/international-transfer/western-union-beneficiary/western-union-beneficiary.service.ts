import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import WesternUnionBeneficiariesProps from './western-union-beneficiary.interface';
import westernUnionBeneficiariesData from './western-union-beneficiary.mock';

const getWesternUnionBeneficiaries = async (): Promise<WesternUnionBeneficiariesProps | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return westernUnionBeneficiariesData;
  }

  const apiResponse: ApiResponse<WesternUnionBeneficiariesProps> = await apiCall({
    endpoint: INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries(),
    method: requestType.GET,
  });

  return apiResponse?.response;
};

export default getWesternUnionBeneficiaries;
