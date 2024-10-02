import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { FeesInquiryPayload, WuFeesInquiryProps } from './wu-fees-inquiry.interface';
import wuFeesInquiryMock from './wu-fees-inquiry.mock';

const westerUnionFeesInquiry = async (
  payload: FeesInquiryPayload,
  beneficiaryCode: string,
): Promise<WuFeesInquiryProps> => {
  if (constants.MOCK_API_RESPONSE) {
    return wuFeesInquiryMock;
  }
  try {
    const apiResponse: ApiResponse<WuFeesInquiryProps> = await apiCall({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/fees-inquiry`,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.successfulResponse) {
      return apiResponse;
    }
    return { apiResponseNotOk: true, ...apiResponse?.response };
  } catch (error) {
    return { error: 'Unknown error' };
  }
};

export default westerUnionFeesInquiry;
