import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';

import musanedInquiryMock from './musaned-inquiry.mock';
import { MusanedInquiryMockProps, MusanedInquiryReqParams } from './musaned-inquiry.interface';
import apiCall from '../../api-call.service';
import MUSANED_URLS from '../musaned.urls';
import { ApiResponse } from '../../services.interface';

const getMusanedInquiryList = async (
  params: MusanedInquiryReqParams,
): Promise<ApiResponse<MusanedInquiryMockProps> | undefined | MusanedInquiryMockProps> => {
  const { walletNumber } = params;
  if (constants.MOCK_API_RESPONSE) {
    return musanedInquiryMock;
  }

  const apiResponse = await apiCall<MusanedInquiryMockProps>({
    endpoint: MUSANED_URLS.GET_INQUIRY(walletNumber),
    method: requestType.GET,
  });

  return apiResponse;
};

export default getMusanedInquiryList;
