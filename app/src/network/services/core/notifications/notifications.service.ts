import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { WalletNumberProp } from './notifications.interface';
import {
  deleteSingleNotificationMock,
  getAllRetainedMessagesMock,
  readSingleNotificationsMock,
} from './notifications.mock';
import apiCall from '../../api-call.service';
import CORE_URLS from '../core.urls';
import { DeviceInfoProps } from '../../services.interface';

/**
 * Fetches all retained messages for a given wallet number.
 *
 * @param {WalletNumberProp} payload - The payload containing the wallet number.
 * @returns {Promise<unknown>} - A promise that resolves to the API response or mock data.
 */
const getAllRetainedMessages = async (payload: WalletNumberProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return getAllRetainedMessagesMock;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_NOTIFICATIONS(payload?.walletNumber),
    method: requestType.GET,
  });

  return apiResponse;
};

const readSingleNotification = async (payload: {
  walletNumber: string;
  apiPayload: {
    deviceInfo: DeviceInfoProps;
    messageIds: string[];
  };
}): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return readSingleNotificationsMock;
  }
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.MARK_SINGLE_NOTIFICATION_AS_READ(payload.walletNumber),
    method: requestType.POST,
    payload: payload.apiPayload,
  });

  return apiResponse;
};

const deleteSingleNotification = async (payload: { walletNumber: string; messageId: string }): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return deleteSingleNotificationMock;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.DELETE_SINGLE_NOTIFICATION(payload.walletNumber, payload.messageId),
    method: requestType.DELETE,
  });

  return apiResponse;
};

export { getAllRetainedMessages, readSingleNotification, deleteSingleNotification };
