import { constants } from '@utilities/index';

/**
 * Represents the data returned in a successful response.
 */
interface ResponseData {
  /**
   * The data returned in the response.
   */
  data: any;
}

/**
 * Represents the error response from the API.
 */
interface ErrorResponse {
  /**
   * The error response message.
   */
  response: {
    /**
     * The error message.
     */
    message: string;
    /**
     * The HTTP status code of the error response.
     */
    status: number;
  };
}

/**
 * Represents the parsed success response.
 */
interface ParsedSuccess {
  /**
   * Indicates whether the response was successful.
   */
  ok: boolean;
}

/**
 * Represents the parsed error response.
 */
interface ParsedError {
  /**
   * The HTTP status code of the error response.
   */
  status: number;
  /**
   * The error message.
   */
  message: string;
}

/**
 * Parses a successful response from the API.
 * @param {ResponseData} data - Data returned in the response.
 * @returns {ParsedSuccess} - Parsed success response.
 */
const parseSuccess = ({ data }: ResponseData): ParsedSuccess => ({
  ...data,
  ok: true
});

/**
 * Parses an error response from the API.
 * @param {ErrorResponse} response - Error response from the API.
 * @returns {ParsedError} - Parsed error response.
 */
const parseError = ({ response }: ErrorResponse): ParsedError => {
  let message: string, status: number;
  if (!response) {
    message = 'Check your network connection and try again.';
    status = constants.NETWORK_CONNECTION_ERROR;
  } else {
    message = response.message;
    status = response.status;
  }
  return { status, message };
};

export default {
  parseSuccess,
  parseError
};
