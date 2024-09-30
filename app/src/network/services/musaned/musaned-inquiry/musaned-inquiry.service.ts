import constants from '@app/constants/constants';
import musanedInquiryMock from './musaned-inquiry.mock';
import { MusanedInquiryMockProps, MusanedInquiryReqParams } from './musaned-inquiry.interface';
import apiCall from '../../api-call.service';
import MUSANED_URLS from '../musaned.urls';
import { ApiResponse } from '../../services.interface';

const getMusanedInquiryList = async (params: MusanedInquiryReqParams): Promise<MusanedInquiryMockProps> => {
  const { walletNumber } = params;
  if (constants.MOCK_API_RESPONSE) {
    return musanedInquiryMock;
  }

  try {
    const apiResponse: ApiResponse<MusanedInquiryMockProps> = await apiCall({
      endpoint: MUSANED_URLS.GET_INQUIRY(walletNumber),
      method: 'GET',
    });

    if (apiResponse?.status) {
      return apiResponse;
    }
    return { ...apiResponse?.response, apiResponseNotOk: true };
  } catch (error) {
    return { error: { error: error.message } || 'Unknown error' };
  }
};

export default getMusanedInquiryList;
