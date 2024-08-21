import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import LocalTransferConfirmMockResponse from './local-transfer-confirm.mock';
import { LocalTransferConfirmPayloadTypes } from './local-transfer-confirm.interface';
import localTransferConfirm from './local-transfer-confirm.service';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('localTransferConfirm', () => {
  const walletNumber = '123456';
  const payload: LocalTransferConfirmPayloadTypes = {
    otp: '1234',
    otpRef: 'OTP08099LMZT8',
    amount: '1.00',
    authentication: {
      transactionId: 'TRPAYC113071d0c5304a429fb3462451307077',
    },
    deviceInfo: {
      platformVersion: '10',
      deviceId: 'WAP,WAP,WAP',
      deviceName: 'WAP',
      platform: 'ANDROID',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const response = await localTransferConfirm(walletNumber, payload);

    expect(response).toEqual(LocalTransferConfirmMockResponse);
  });

  it('should return API response on successful API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse = LocalTransferConfirmMockResponse;

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await localTransferConfirm(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: 'POST',
      payload,
    });

    expect(response).toEqual(apiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse = {
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await localTransferConfirm(walletNumber, payload);

    expect(response).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when API call throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const errorMessage = 'Network error';

    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await localTransferConfirm(walletNumber, payload);

    expect(response).toEqual({ error: errorMessage });
  });

  it('should return "Unknown error" when API call throws an error without a message', async () => {
    constants.MOCK_API_RESPONSE = false;

    (apiCall as jest.Mock).mockRejectedValue(new Error());

    const response = await localTransferConfirm(walletNumber, payload);

    expect(response).toEqual({ error: 'Unknown error' });
  });
});
