import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { SetPasscodeServiceProps } from './set-passcode.interface';
import setPasscodeMock from './set-passcode.mock';

const setPasscode = async (payload: SetPasscodeServiceProps, dispatch: (action: any) => void): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = setPasscodeMock;
    
    return response;
  }

  const apiResponse = await apiCall({
    endpoint: CORE_URLS.SET_PASSCODE,
    method: requestType.POST,
    payload,
  });

  
  return apiResponse;
};
export default setPasscode;
