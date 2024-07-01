import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { ForgetPasscodeProps } from './forget-passcode.interface';
import forgetPasscodeMock from './forget-passcode.mock';

const forgetPasscode = async (payload: ForgetPasscodeProps): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    return forgetPasscodeMock;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.FORGET_PASSCODE,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.ok) {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default forgetPasscode;
