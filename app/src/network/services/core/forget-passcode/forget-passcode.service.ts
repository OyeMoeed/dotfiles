import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import CORE_URLS from '../core.urls';
import { IconfirmForgetPasscodeOtpReq, IconfirmForgetPasscodeOtpRes } from './forget-passcode.interface';
import forgetPasscodeMock from './forget-passcode.mock';

const forgetPasscode = async (
  payload: IconfirmForgetPasscodeOtpReq,
): Promise<ApiResponse<IconfirmForgetPasscodeOtpRes>> => {
    if (constants.MOCK_API_RESPONSE) {
      return forgetPasscodeMock;
    }
  const apiResponse = await apiCall<IconfirmForgetPasscodeOtpRes>({
    endpoint: CORE_URLS.CONFIRM_OTP_FORGET_PASSCODE,
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export default forgetPasscode;
