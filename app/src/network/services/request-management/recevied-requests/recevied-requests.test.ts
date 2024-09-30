import constantsNetwork from '@app/network/constants';
import requestType from '@app/network/request-types.network';
import constants from '@app/constants/constants';
import apiCall from '../../api-call.service';
import { getAllRecivedRequests } from './recevied-requests.service';
import { getAllRequestsMock } from './recevied-requests.mock';
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

      const result = await getAllRecivedRequests(payload);
      expect(result).toBe(getAllRequestsMock);
    });

    it('should return API response when MOCK_API_RESPONSE is false and API call is successful', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = { walletNumber: '12345', currentPage: 1 };
      const mockApiResponse = { status: { type: 'SUCCESS' } };
      (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await getAllRecivedRequests(payload);
      expect(result).toBe(mockApiResponse);
      expect(apiCall).toHaveBeenCalledWith({
        endpoint: REQUEST_MANAGEMENT_URLS.getAllRequests(payload.walletNumber),
        method: requestType.GET,
        headers: {
          mode: 'FROM',
          offset: payload.currentPage,
          [constantsNetwork.MAX_RECORD]: 100,
        },
      });
    });

    it('should return error object when API call fails', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = { walletNumber: '12345', currentPage: 1 };
      const mockError = new Error('API Error');
      (apiCall as jest.Mock).mockRejectedValue(mockError);

      const result = await getAllRecivedRequests(payload);
      expect(result).toEqual({ error: 'API Error' });
    });
  });
});
