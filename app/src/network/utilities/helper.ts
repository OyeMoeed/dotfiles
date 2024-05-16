import FormData from 'form-data';
import { Platform } from 'react-native';
import responseService from '@network/interceptors/response-service';

/**
 * Timeout duration for network requests.
 */
const timeout: number = 45000; // Set timeout from config

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
    'Content-Type': 'application/json'
  },
  params
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
    'Content-Type': 'multipart/form-data'
  }
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
    name: 'picture'
  });
  form.append('type', 'channel');
  return form;
};

/**
 * Handles network response.
 * @param {Promise<any>} responsePromise - Promise representing the network response.
 * @returns {Promise<any>} - Promise representing the parsed response.
 */
const handleResponse = (responsePromise: Promise<any>): Promise<any> =>
  responsePromise
    .then((response) => {
      return responseService.parseSuccess(response);
    })
    .catch((error) => {
      return responseService.parseError(error);
    });

export { createFormData, defaultOptions, defaultUploadOptions, handleResponse };
