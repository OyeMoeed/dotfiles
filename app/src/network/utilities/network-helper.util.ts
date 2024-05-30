import { parseError } from '@app/network/interceptors/parse-error.interceptor';
import { parseSuccess } from '@app/network/interceptors/parse-success.interceptor';
import FormData from 'form-data';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import { ParsedError, ParsedSuccess } from '../interceptors/response-types';

/**
 * Timeout duration for network requests.
 */
const timeout: number = Config.REQUEST_TIMEOUT; // Set timeout from config

/**
 * Represents the options for a network request.
 */
export type RequestOptions = {
  /**
   * Timeout duration for the request.
   */
  timeout: number;
  /**
   * Headers for the request.
   */
  headers: {
    Authorization?: string | null;
    'Content-Type': string;
  };
  /**
   * Query parameters for the request.
   */
  params?: object | null;
};

/**
 * Default options for network requests.
 * @param {string | null} authToken - Authorization token.
 * @param {object | null} params - Query parameters.
 * @returns {RequestOptions} - Default request options.
 */
const defaultOptions = (authToken: string | null = null, params: object | null = null): RequestOptions => ({
  timeout,
  headers: {
    Authorization: authToken,
    'Content-Type': 'application/json',
  },
  params,
});

/**
 * Default options for uploading files.
 * @param {string} authToken - Authorization token.
 * @returns {RequestOptions} - Default upload options.
 */
const defaultUploadOptions = (authToken: string): RequestOptions => ({
  timeout,
  headers: {
    Authorization: authToken,
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Creates form data for uploading files.
 * @param {object} data - Data containing the file URI.
 * @returns {FormData} - Form data for uploading files.
 */
const createFormData = (data: { uri: string }): FormData => {
  const form = new FormData();
  form.append('attachment', {
    uri: Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
    type: 'image/jpeg',
    name: 'picture',
  });
  form.append('type', 'channel');
  return form;
};

/**
 * Handles network response.
 * @param {Promise<any>} responsePromise - Promise representing the network response.
 * @returns {Promise<ParsedSuccess<any> | ParsedError>} - Promise representing the parsed response either success or error.
 */
const handleResponse = async (responsePromise: Promise<any>): Promise<ParsedSuccess<any> | ParsedError> =>
  responsePromise.then((response) => parseSuccess(response)).catch((response) => parseError(response));

export { createFormData, defaultOptions, defaultUploadOptions, handleResponse };
