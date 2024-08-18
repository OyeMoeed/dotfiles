import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { IconfirmForgetPasscodeOtpReq, IconfirmForgetPasscodeOtpRes } from './forget-passcode.interface';
import { ApiResponse } from '../../services.interface';

const forgetPasscode = async (
  payload: IconfirmForgetPasscodeOtpReq,
): Promise<ApiResponse<IconfirmForgetPasscodeOtpRes>> => {
  const apiResponse = await apiCall<IconfirmForgetPasscodeOtpRes>({
    endpoint: CORE_URLS.CONFIRM_OTP_FORGET_PASSCODE,
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export default forgetPasscode;
