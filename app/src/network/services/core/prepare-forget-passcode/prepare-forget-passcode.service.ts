import requestType from '@app/network/request-types.network';
import { setAppData } from '@app/store/slices/app-data-slice';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import {
  prepareForgetPasscodeOtpRes,
  PrepareForgetPasscodeProps,
  validateForgetPasscodeOtpReq,
  validateForgetPasscodeOtpRes,
} from './prepare-forget-passcode.interface';
import { ApiResponse } from '../../services.interface';

const prepareForgetPasscode = async (
  payload: PrepareForgetPasscodeProps,
  dispatch: (action: any) => void,
): Promise<ApiResponse<prepareForgetPasscodeOtpRes>> => {
  try {
    const apiResponse = await apiCall<prepareForgetPasscodeOtpRes>({
      endpoint: CORE_URLS.PREPARE_FORGET_PASSCODE,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status.type === 'SUCCESS') {
      const { otpRef, walletNumber } = apiResponse?.data?.response || {};

      if (dispatch) {
        dispatch(setAppData({ otpRef, walletNumber }));
      }

      return apiResponse;
    }
    return apiResponse;
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

const validateForgetPasscodeOtp = async (
  payload: validateForgetPasscodeOtpReq,
): Promise<ApiResponse<validateForgetPasscodeOtpRes>> => {
  const apiResponse = await apiCall<validateForgetPasscodeOtpRes>({
    endpoint: CORE_URLS.VALIDATE_OTP_FORGET_PASSCODE,
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export { prepareForgetPasscode, validateForgetPasscodeOtp };
