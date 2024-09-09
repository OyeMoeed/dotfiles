import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import apiCall from '@network/services/api-call.service';
import AUTHENTICATION_URLS from '../authentication.urls';
import { OtpVerificationProps } from './otp-verification.interface';
import validateOtpMock from './otp-verification.mock';

const otpVerification = async (
  payload: OtpVerificationProps,
  dispatch: (action: any) => void,
): Promise<object | unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    const resposne = validateOtpMock;
    dispatch(setUserInfo(resposne?.response));
    return resposne;
  }

  const apiResponse = await apiCall({
    endpoint: AUTHENTICATION_URLS.OTP_VERIFICATION,
    method: requestType.POST,
    payload,
  });
  return apiResponse;
};

export default otpVerification;
