import requestType from '@app/network/request-types.network';
import constants from '@app/constants/constants';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '../../api-call.service';
import { createMoneyRequestService, getAllSentRequests } from './sent-requests.service';
import { createMoneyRequestMockResponse, getAllRequestsMock } from './sent-requests.mock';
import REQUEST_MANAGEMENT_URLS from '../request-management.urls';

jest.mock('../../api-call.service');

// mock @react-native-community/netinfo
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn().mockResolvedValue({
    type: 'wifi',
    isConnected: true,
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

describe('Request Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRetainedMessages', () => {
    it('should return mock data when MOCK_API_RESPONSE is true', async () => {
      constants.MOCK_API_RESPONSE = true;
      const payload = { walletNumber: '12345', currentPage: 1 };
      const result = await getAllSentRequests(payload);
      expect(result).toBe(getAllRequestsMock);
    });

    it('should return API response when MOCK_API_RESPONSE is false and API call is successful', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = { walletNumber: '12345', currentPage: 1 };
      const mockApiResponse = { status: { type: 'SUCCESS' } };
      (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await getAllSentRequests(payload);
      expect(result).toBe(mockApiResponse);
      expect(apiCall).toHaveBeenCalledWith({
        endpoint: REQUEST_MANAGEMENT_URLS.getAllRequests(payload.walletNumber),
        method: requestType.GET,
        headers: {
          mode: 'TO',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'max-record': 100,
        },
      });
    });

    it('should return error object when API call fails', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = { walletNumber: '12345' };
      const mockError = new Error('API Error');
      (apiCall as jest.Mock).mockRejectedValue(mockError);

      const result = await getAllSentRequests(payload);
      expect(result).toEqual({ error: 'API Error' });
    });
  });
});

describe('createMoneyRequestService', () => {
  const walletNumber = '123456';
  const payload = {
    requests: [
      {
        mobileNumber: '0583968704',
        amount: '1',
        note: 'labor send mony back to sponsor',
        inContactList: true,
      },
    ],
    deviceInfo: {
      platformVersion: '10',
      deviceName: 'Apple',
      deviceId: 'A271B326-6CAB-4AA0-BA22-84E6EBC16167,Apple,iPhone16,1',
      platform: 'IOS',
    },
  };

  it('should return mock response when MOCK_API_RESPONSE is true', async () => {
    const response = await createMoneyRequestService(walletNumber, payload);
    expect(response).toEqual(createMoneyRequestMockResponse);
  });

  it('should return successful API response', async () => {
    const mockResponse = {
      status: { type: ApiResponseStatusType.SUCCESS },
      response: { moneyRequestsResult: [] },
      successfulResponse: true,
    };

    (apiCall as jest.Mock).mockResolvedValue(mockResponse);

    const response = await createMoneyRequestService(walletNumber, payload);
    expect(response).toEqual(mockResponse);
  });

  it('should return apiResponseNotOk if API response is not successful', async () => {
    const mockResponse = {
      status: { type: ApiResponseStatusType.FAILURE },
      response: { moneyRequestsResult: [] },
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(mockResponse);

    const response = await createMoneyRequestService(walletNumber, payload);
    expect(response).toEqual({ apiResponseNotOk: true, apiResponse: mockResponse });
  });

  it('should return an error message when API call fails', async () => {
    const mockError = new Error('API call failed');
    (apiCall as jest.Mock).mockRejectedValue(mockError);

    const response = await createMoneyRequestService(walletNumber, payload);
    expect(response).toEqual({ error: 'API call failed' });
  });
});
