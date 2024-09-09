import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import multiPaymentPrepareBillService from './multi-payment-prepare-bill.service';
import multiPaymentPrepareBillMockResponse from './multi-payment-prepare-bill.mock';
import {
  MultiPaymentPrepareBillPayloadTypes,
  MultiPaymentPrepareBillResponseTypes,
} from './multi-payment-prepare-bill.interface';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('multiPaymentPrepareBillService', () => {
  const payload: MultiPaymentPrepareBillPayloadTypes = {
    deviceInfo: {
      platformVersion: '10',
      deviceId: 'DFA9CB8E-A1C3-446B-999A-3A3875393515,Apple,iPhone10,6',
      deviceName: 'Apple',
      platform: 'IOS',
    },
    walletNumber: '10587981',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const response = await multiPaymentPrepareBillService(payload);

    expect(response).toEqual(multiPaymentPrepareBillMockResponse);
  });

  it('should return API response on successful API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse: MultiPaymentPrepareBillResponseTypes = multiPaymentPrepareBillMockResponse;

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await multiPaymentPrepareBillService(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: 'POST',
      payload,
    });

    expect(response).toEqual(apiResponse);
  });

  it('should return { apiResponseNotOk: true, apiResponse } when API response status type is not SUCCESS', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse = {
      status: {
        code: 400,
        message: 'Bad Request',
        type: ApiResponseStatusType.FAILURE,
      },
      response: {
        otpRef: '',
      },
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await multiPaymentPrepareBillService(payload);

    expect(response).toEqual({ apiResponseNotOk: true, apiResponse });
  });

  it('should return an error message when API call throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const errorMessage = 'Network error';

    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await multiPaymentPrepareBillService(payload);

    expect(response).toEqual({ error: errorMessage });
  });

  it('should return "Unknown error" when API call throws an error without a message', async () => {
    constants.MOCK_API_RESPONSE = false;

    (apiCall as jest.Mock).mockRejectedValue(new Error());

    const response = await multiPaymentPrepareBillService(payload);

    expect(response).toEqual({ error: 'Unknown error' });
  });
});
