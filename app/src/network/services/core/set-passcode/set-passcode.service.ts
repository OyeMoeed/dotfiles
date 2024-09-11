import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { SetPasscodeServiceProps } from './set-passcode.interface';
import setPasscodeMock from './set-passcode.mock';

// TODO: remove all unknown props
const setPasscode = async (payload: SetPasscodeServiceProps): Promise<unknown> => {
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
