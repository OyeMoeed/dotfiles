/**
 * Represents the data returned in a successful response.
 */
export interface ResponseData {
  /**
   * The data returned in the response.
   */
  response: {
    status: number;
    data: any;
  };
  headers: {};
}
