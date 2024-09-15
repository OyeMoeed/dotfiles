import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';
import { IPrepareIssueCardReq, IPrepareIssueCardRes } from './issue-card-prepare.interface';

const prepareIssueCard = async (
  walletNumber: string,
  body: IPrepareIssueCardReq,
): Promise<ApiResponse<IPrepareIssueCardRes>> => {
  try {
    const apiResponse = await apiCall<IPrepareIssueCardRes>({
      endpoint: CARDS_MANAGEMENT_URLS.prepare_issue_card(walletNumber),
      method: requestType.POST,
      payload: body,
    });
    return apiResponse as ApiResponse<IPrepareIssueCardRes>;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export default prepareIssueCard;
