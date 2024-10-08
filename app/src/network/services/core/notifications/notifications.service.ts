import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import {
  DeleteNotificationResponse,
  ReadNotificationResponse,
} from '@app/screens/notification-center/notification-center.interface';
import { WalletNumberProp } from './notifications.interface';
import { deleteSingleNotificationMock, getAllRetainedMessagesMock, readNotificationsMock } from './notifications.mock';
import apiCall from '../../api-call.service';
import CORE_URLS from '../core.urls';
import { DeviceInfoProps } from '../../services.interface';

/**
 * Fetches all retained messages for a given wallet number.
 *
 * @param {WalletNumberProp} payload - The payload containing the wallet number.
 * @returns {Promise<unknown>} - A promise that resolves to the API response or mock data.
 */
const getAllRetainedMessages = async (payload: WalletNumberProp): Promise<any> => {
  if (constants.MOCK_API_RESPONSE) {
    return getAllRetainedMessagesMock;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.GET_NOTIFICATIONS(payload?.walletNumber, payload?.pageNumber, 20),
    method: requestType.GET,
  });

  return apiResponse;
};

/**
 * Marks a notification as read for a given wallet number.
 *
 * @param {Object} payload - The payload containing the wallet number and API payload.
 * @param {string} payload.walletNumber - The wallet number.
 * @param {Object} payload.apiPayload - The API payload.
 * @param {DeviceInfoProps} payload.apiPayload.deviceInfo - The device information.
 * @param {string[]} payload.apiPayload.messageIds - The message IDs to mark as read.
 * @returns {Promise<unknown>} - A promise that resolves to the API response or mock data.
 */
const readNotification = async (payload: {
  walletNumber: string;
  apiPayload: {
    deviceInfo: DeviceInfoProps;
    messageIds: string[];
  };
}): Promise<ReadNotificationResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return readNotificationsMock;
  }
  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.MARK_SINGLE_NOTIFICATION_AS_READ(payload.walletNumber),
    method: requestType.POST,
    payload: payload.apiPayload,
  });

  return apiResponse;
};

const deleteSingleNotification = async (payload: {
  walletNumber: string;
  messageId: string;
}): Promise<DeleteNotificationResponse> => {
  if (constants.MOCK_API_RESPONSE) {
    return deleteSingleNotificationMock;
  }

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.DELETE_SINGLE_NOTIFICATION(payload.walletNumber, payload.messageId),
    method: requestType.DELETE,
  });

  return apiResponse;
};

export { getAllRetainedMessages, readNotification, deleteSingleNotification };
