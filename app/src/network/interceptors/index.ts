import axios, { AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import Config from 'react-native-config';
import { defaultOptions, handleResponse, RequestOptions } from '../utilities/helper';

/**
 * Base URL for API requests.
 */
const baseUrl: string | undefined = Config.BASE_URL;

/**
 * Parameters for making a resource request.
 */
interface ResourceRequestParams {
  /**
   * The resource endpoint.
   */
  resource: string;
  /**
   * Authorization token.
   */
  authToken?: string | null;
  /**
   * Query parameters for the request.
   */
  params?: any | null;
  /**
   * Additional options for the request.
   */
  options?: AxiosRequestConfig | null;
  /**
   * Data to be sent with the request.
   */
  data?: any;
}

/**
 * Selected options for the request.
 */
type SelectedOptionsProps = RequestOptions | AxiosRequestConfig<any>;

/**
 * Reads a resource from the API.
 * @param {ResourceRequestParams} params - Parameters for the request.
 * @returns {Promise<any>} - Promise representing the response.
 */
const readResource = ({
  resource,
  authToken = null,
  params = null,
  options = null
}: ResourceRequestParams): Promise<any> => {
  const selectedOptions: SelectedOptionsProps = _.isEmpty(options) ? defaultOptions(authToken, params) : options;
  return handleResponse(axios.get(`${baseUrl}/${resource}`, selectedOptions));
};

/**
 * Deletes a resource from the API.
 * @param {ResourceRequestParams} params - Parameters for the request.
 * @returns {Promise<any>} - Promise representing the response.
 */
const deleteResource = ({ authToken, resource, params, options = null }: ResourceRequestParams): Promise<any> => {
  const selectedOptions: SelectedOptionsProps = _.isEmpty(options) ? defaultOptions(authToken, params) : options;
  return handleResponse(axios.delete(`${baseUrl}/${resource}`, selectedOptions));
};

/**
 * Updates a resource on the API.
 * @param {ResourceRequestParams} params - Parameters for the request.
 * @returns {Promise<any>} - Promise representing the response.
 */
const updateResource = ({
  resource,
  data,
  authToken = null,
  options = null,
  params = null
}: ResourceRequestParams): Promise<any> => {
  const selectedOptions: SelectedOptionsProps = _.isEmpty(options) ? defaultOptions(authToken, params) : options;
  return handleResponse(axios.post(`${baseUrl}/${resource}`, data, selectedOptions));
};

/**
 * Creates a new resource on the API.
 * @param {ResourceRequestParams} params - Parameters for the request.
 * @returns {Promise<any>} - Promise representing the response.
 */
const createResource = ({
  resource,
  data,
  authToken = null,
  options = null,
  params = null
}: ResourceRequestParams): Promise<any> => {
  const selectedOptions: SelectedOptionsProps = _.isEmpty(options) ? defaultOptions(authToken, params) : options;
  return handleResponse(axios.put(`${baseUrl}/${resource}`, data, selectedOptions));
};

export { createResource, deleteResource, readResource, updateResource };
