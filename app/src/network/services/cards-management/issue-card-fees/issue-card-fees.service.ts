import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '@app/network/services/services.interface';
import constants from '@app/constants/constants';
import CARDS_MANAGEMENT_URLS from '../cards-management.urls';
import { CardType } from '../issue-card-inquire/issue-card-inquire.interface';
import { IssueCardFeesRes } from './issue-card-fees.interface';
import issueCardFeesMockResponse from './issue-card-fees.mock';

const getCardIssuanceFees = async (
  walletNumber: string,
  cardType: CardType,
  transactionType: string,
): Promise<ApiResponse<IssueCardFeesRes>> => {
  try {
    if (constants.MOCK_API_RESPONSE) {
      return issueCardFeesMockResponse;
    }
    const apiResponse = await apiCall<IssueCardFeesRes>({
      endpoint: CARDS_MANAGEMENT_URLS.issue_card_fees(walletNumber, cardType, transactionType),
      method: requestType.GET,
    });
    return apiResponse as ApiResponse<IssueCardFeesRes>;
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

export default getCardIssuanceFees;
