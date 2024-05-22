/**
 * Represents the error response from the API.
 */
export interface ErrorResponse {
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
