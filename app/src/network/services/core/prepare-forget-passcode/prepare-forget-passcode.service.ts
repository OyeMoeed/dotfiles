import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { setAppData } from '@app/store/slices/app-data-slice';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { PrepareForgetPasscodeProps } from './prepare-forget-passcode.interface';
import prepareForgetPasscodeMock from './prepare-forget-passcode.mock';

const prepareForgetPasscode = async (
  payload: PrepareForgetPasscodeProps,
  dispatch: (action: any) => void,
): Promise<object> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = prepareForgetPasscodeMock;
    dispatch(setAppData(response));
    return response;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: CORE_URLS.PREPARE_FORGET_PASSCODE,
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.ok) {
      const { otpRef, walletNumber } = apiResponse?.data?.response || {};

      if (dispatch) {
        dispatch(setAppData({ otpRef, walletNumber }));
      }

      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};

export default prepareForgetPasscode;
