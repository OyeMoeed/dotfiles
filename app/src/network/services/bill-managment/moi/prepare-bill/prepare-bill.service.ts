import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_URLS from '../../bills-urls';
import { PrepareBillPayloadProps } from './prepare-bill.interface';
import prepareBillMock from './prepare-bill.mock';

const prepareBill = async (payload: PrepareBillPayloadProps, paymentType: string): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = prepareBillMock;
    return response;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: BILLS_URLS.PREPARE_MOI_BILL(paymentType),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export default prepareBill;
