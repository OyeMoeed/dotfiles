/**
 * Represents the parsed success response.
 */
export interface ParsedSuccess<T> {
  /**
   * Indicates whether the response was successful.
   */
  ok: boolean;
  data: T;
  headers: {};
}

/**
 * Represents the parsed error response.
 */
export interface ParsedError {
  /**
   * The HTTP status code of the error response.
   */
  status: number;
  /**
   * The error message.
   */
  message: string;
}
