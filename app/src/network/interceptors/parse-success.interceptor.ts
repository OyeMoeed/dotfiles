import { ParsedSuccess } from './response-types';
import { ResponseData } from './response-types/data-response.type';

/**
 * Parses a successful response from the API.
 * @param {ResponseData} data - Data returned in the response.
 * @returns {ParsedSuccess} - Parsed success response.
 */
const parseSuccess = <T>({ response }: ResponseData): ParsedSuccess<T> => {
  if (response.status >= 200 && response.status < 300) {
    return { data: response.data as T, ok: true };
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};

export { parseSuccess };
