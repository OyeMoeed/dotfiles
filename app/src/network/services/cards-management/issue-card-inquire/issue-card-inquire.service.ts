import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';
import { CardType, IssueCardInquireRes } from './issue-card-inquire.interface';

const issueCardInquire = async (
  walletNumber: string,
  cardType: CardType,
): Promise<ApiResponse<IssueCardInquireRes>> => {
  try {
    const apiResponse = await apiCall<IssueCardInquireRes>({
      endpoint: CARDS_MANAGEMENT_URLS.issue_card_inquire(walletNumber, cardType),
      method: requestType.GET,
    });
    return apiResponse as ApiResponse<IssueCardInquireRes>;
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

export default issueCardInquire;
