import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { ChangePasswordProps } from './change-passcode.interface';
import chnagePasscodeMock from './change-passcode.mock';

const changePasscodeReq = async (payload: ChangePasswordProps): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return chnagePasscodeMock;
  }

  const apiResponse = await apiCall({
    endpoint: `${CORE_URLS.CHANGE_PASSCODE(payload?.walletNumber)}`,
    method: requestType.POST,
    payload: payload?.body,
  });
  
  return apiResponse;
};

export default changePasscodeReq;
