/**
 * Represents the properties of API headers.
 */
export interface ApiHeaderProps {
  /**
   * The URL of the API endpoint.
   */
  url: string;
  /**
   * The HTTP method used for the request.
   */
  method: string;
  /**
   * The body of the request, which can be an object, a string, or null.
   */
  body?: object | string | null;
}
