import constants from '@app/network/constants';
import { ErrorResponse, ParsedError } from './response-types';

/**
 * Parses an error response from the API.
 * @param {ErrorResponse} response - Error response from the API.
 * @returns {ParsedError} - Parsed error response.
 */
const parseError = (response: ErrorResponse): ParsedError => {
  let message: string;
  let status: number;
  if (!response) {
    message = 'Check your network connection and try again.';
    status = constants.NETWORK_CONNECTION_ERROR;
  } else {
    message = response.message;
    status = response.status;
  }
  return { status, message };
};

export default parseError;
