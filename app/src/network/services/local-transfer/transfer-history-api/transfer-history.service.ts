import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import { LocalTransferMockProps, LocalTransferReqParams } from './transfer-history.interface';
import localTransferMock from './transfer-history.mock';

const getlocalTransaction = async (params: LocalTransferReqParams): Promise<LocalTransferMockProps> => {
  const { walletNumber, fromDate, toDate, beneficiaryName, bankName, fromAmount, toAmount } = params;
  if (constants.MOCK_API_RESPONSE) {
    return localTransferMock;
  }
  try {
    const apiResponse: ApiResponse<LocalTransferMockProps> = await apiCall({
      endpoint:
        `${LOCAL_TRANSFERS_URLS.get_transaction(walletNumber)}` +
        `${beneficiaryName ? `&beneficiary-name=${beneficiaryName}` : ''}` +
        `${bankName ? `&bank-name=${bankName}` : ''}` +
        `${fromAmount ? `&from-amount=${fromAmount}` : ''}` +
        `${toAmount ? `&to-amount=${toAmount}` : ''}` +
        `${fromDate ? `&from-date=${fromDate}` : ''}` +
        `${toDate ? `&to-date=${toDate}` : ''}`,
      method: requestType.GET,
    });

    if (apiResponse?.response?.ok) {
      return apiResponse?.response;
    }
    return { ...apiResponse?.response, apiResponseNotOk: true };
  } catch (error) {
    return { error: { error: error.message } || 'Unknown error' };
  }
};

export default getlocalTransaction;