import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';
import { IConfirmIssueCardReq, IConfirmIssueCardRes } from './issue-card-confirm.interface';

const confirmIssueCard = async (
  walletNumber: string,
  body: IConfirmIssueCardReq,
): Promise<ApiResponse<IConfirmIssueCardRes>> => {
  try {
    const apiResponse = await apiCall<IConfirmIssueCardRes>({
      endpoint: CARDS_MANAGEMENT_URLS.confirm_issue_card(walletNumber),
      method: requestType.POST,
      payload: body,
    });
    return apiResponse as ApiResponse<IConfirmIssueCardRes>;
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

export default confirmIssueCard;
