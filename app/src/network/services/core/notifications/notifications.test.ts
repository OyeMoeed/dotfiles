import requestType from '@app/network/request-types.network';
import constants from '@app/constants/constants';
import { getAllRetainedMessages, readSingleNotification, deleteSingleNotification } from './notifications.service';
import apiCall from '../../api-call.service';
import {
  getAllRetainedMessagesMock,
  readSingleNotificationsMock,
  deleteSingleNotificationMock,
} from './notifications.mock';
import CORE_URLS from '../core.urls';

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

describe('Notification Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRetainedMessages', () => {
    it('should return mock data when MOCK_API_RESPONSE is true', async () => {
      constants.MOCK_API_RESPONSE = true;
      const payload = { walletNumber: '12345' };
      const result = await getAllRetainedMessages(payload);
      expect(result).toBe(getAllRetainedMessagesMock);
    });

    it('should return API response when MOCK_API_RESPONSE is false and API call is successful', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = { walletNumber: '12345' };
      const mockApiResponse = { status: { type: 'SUCCESS' } };
      (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await getAllRetainedMessages(payload);
      expect(result).toBe(mockApiResponse);
      expect(apiCall).toHaveBeenCalledWith({
        endpoint: CORE_URLS.GET_NOTIFICATIONS(payload.walletNumber),
        method: requestType.GET,
      });
    });

    it('should return error object when API call fails', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = { walletNumber: '12345' };
      const mockError = new Error('API Error');
      (apiCall as jest.Mock).mockRejectedValue(mockError);

      const result = await getAllRetainedMessages(payload);
      expect(result).toEqual({ error: 'API Error' });
    });
  });

  describe('readSingleNotification', () => {
    it('should return mock data when MOCK_API_RESPONSE is true', async () => {
      constants.MOCK_API_RESPONSE = true;
      const payload = {
        walletNumber: '12345',
        apiPayload: {
          deviceInfo: { platformVersion: '1.0', deviceId: 'device123', deviceName: 'Device', platform: 'iOS' },
          messageIds: ['msg1'],
        },
      };
      const result = await readSingleNotification(payload);
      expect(result).toBe(readSingleNotificationsMock);
    });

    it('should return API response when MOCK_API_RESPONSE is false and API call is successful', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = {
        walletNumber: '12345',
        apiPayload: {
          deviceInfo: { platformVersion: '1.0', deviceId: 'device123', deviceName: 'Device', platform: 'iOS' },
          messageIds: ['msg1'],
        },
      };
      const mockApiResponse = { status: { type: 'SUCCESS' } };
      (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await readSingleNotification(payload);
      expect(result).toBe(mockApiResponse);
      expect(apiCall).toHaveBeenCalledWith({
        endpoint: CORE_URLS.MARK_SINGLE_NOTIFICATION_AS_READ(payload.walletNumber),
        method: requestType.POST,
        payload: payload.apiPayload,
      });
    });

    it('should return error object when API call fails', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = {
        walletNumber: '12345',
        apiPayload: {
          deviceInfo: { platformVersion: '1.0', deviceId: 'device123', deviceName: 'Device', platform: 'iOS' },
          messageIds: ['msg1'],
        },
      };
      const mockError = new Error('API Error');
      (apiCall as jest.Mock).mockRejectedValue(mockError);

      const result = await readSingleNotification(payload);
      expect(result).toEqual({ error: 'API Error' });
    });
  });

  describe('deleteSingleNotification', () => {
    it('should return mock data when MOCK_API_RESPONSE is true', async () => {
      constants.MOCK_API_RESPONSE = true;
      const payload = { walletNumber: '12345', messageId: 'msg1' };
      const result = await deleteSingleNotification(payload);
      expect(result).toBe(deleteSingleNotificationMock);
    });

    it('should return API response when MOCK_API_RESPONSE is false and API call is successful', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = { walletNumber: '12345', messageId: 'msg1' };
      const mockApiResponse = { status: { type: 'SUCCESS' } };
      (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await deleteSingleNotification(payload);
      expect(result).toBe(mockApiResponse);
      expect(apiCall).toHaveBeenCalledWith({
        endpoint: CORE_URLS.DELETE_SINGLE_NOTIFICATION(payload.walletNumber, payload.messageId),
        method: requestType.DELETE,
      });
    });

    it('should return error object when API call fails', async () => {
      constants.MOCK_API_RESPONSE = false;
      const payload = { walletNumber: '12345', messageId: 'msg1' };
      const mockError = new Error('API Error');
      (apiCall as jest.Mock).mockRejectedValue(mockError);

      const result = await deleteSingleNotification(payload);
      expect(result).toEqual({ error: 'API Error' });
    });
  });
});
