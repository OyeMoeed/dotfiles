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
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.GET_NOTIFICATIONS(payload?.walletNumber),
      method: requestType.GET,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

/**
 * Marks a single notification as read for a given wallet number.
 *
 * @param {Object} payload - The payload containing the wallet number and API payload.
 * @param {string} payload.walletNumber - The wallet number.
 * @param {Object} payload.apiPayload - The API payload.
 * @param {DeviceInfoProps} payload.apiPayload.deviceInfo - The device information.
 * @param {string[]} payload.apiPayload.messageIds - The message IDs to mark as read.
 * @returns {Promise<unknown>} - A promise that resolves to the API response or mock data.
 */
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
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.MARK_SINGLE_NOTIFICATION_AS_READ(payload.walletNumber),
      method: requestType.POST,
      payload: payload.apiPayload,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

/**
 * Deletes a single notification for a given wallet number and message ID.
 *
 * @param {Object} payload - The payload containing the wallet number and message ID.
 * @param {string} payload.walletNumber - The wallet number.
 * @param {string} payload.messageId - The message ID to delete.
 * @returns {Promise<unknown>} - A promise that resolves to the API response or mock data.
 */
const deleteSingleNotification = async (payload: { walletNumber: string; messageId: string }): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return deleteSingleNotificationMock;
  }
  try {
    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.DELETE_SINGLE_NOTIFICATION(payload.walletNumber, payload.messageId),
      method: requestType.DELETE,
    });

    if (apiResponse?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};

export { getAllRetainedMessages, readSingleNotification, deleteSingleNotification };
