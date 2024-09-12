import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import CORE_URLS from '../core.urls';
import {
  prepareForgetPasscodeOtpRes,
  PrepareForgetPasscodeProps,
  validateForgetPasscodeOtpReq,
  validateForgetPasscodeOtpRes,
} from './prepare-forget-passcode.interface';
import prepareForgetPasscodeMock from './prepare-forget-passcode.mock';
import validateForgetPasscodeMock from './validate-passcode.mock';

const prepareForgetPasscode = async (
  payload: PrepareForgetPasscodeProps,
): Promise<ApiResponse<prepareForgetPasscodeOtpRes> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return prepareForgetPasscodeMock as any;
  }

  const apiResponse = await apiCall<prepareForgetPasscodeOtpRes>({
    endpoint: CORE_URLS.PREPARE_FORGET_PASSCODE,
    method: requestType.POST,
    payload,
  });
  return apiResponse;
};

const validateForgetPasscodeOtp = async (
  payload: validateForgetPasscodeOtpReq,
): Promise<ApiResponse<validateForgetPasscodeOtpRes>> => {
  if (constants.MOCK_API_RESPONSE) {
    return validateForgetPasscodeMock as any;
  }
  const apiResponse: any = await apiCall<validateForgetPasscodeOtpRes>({
    endpoint: CORE_URLS.VALIDATE_OTP_FORGET_PASSCODE,
    method: requestType.POST,
    payload,
  });

  return apiResponse;
};

export { prepareForgetPasscode, validateForgetPasscodeOtp };
