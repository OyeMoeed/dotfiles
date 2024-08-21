import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse, IApiStatus } from '../../services.interface';
import CORE_URLS from '../core.urls';
import {
  IGetCoreLovPayload,
  IGetCoreLovResponse,
  IGetCoreManagementLovPayload,
  IGetCoreManagementLovResponse,
  IGetLovPayload,
  IGetLovResponse,
} from './get-lov.interface';

const getLov = async (payload: IGetLovPayload): Promise<ApiResponse<IGetLovResponse>> => {
  try {
    const apiResponse = await apiCall<IGetLovResponse>({
      endpoint: CORE_URLS.GET_LOV,
      method: requestType.POST,
      payload,
    });
    return apiResponse;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export const getCoreLov = async (payload: IGetCoreLovPayload): Promise<ApiResponse<IGetCoreLovResponse>> => {
  try {
    const apiResponse = await apiCall<IGetCoreLovResponse>({
      endpoint: CORE_URLS.GET_CORE_LOV,
      method: requestType.POST,
      payload,
    });
    return apiResponse;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export const geCoreManagementLov = async (
  payload: IGetCoreManagementLovPayload,
): Promise<ApiResponse<IGetCoreManagementLovResponse>> => {
  try {
    const apiResponse = await apiCall<IGetCoreManagementLovResponse>({
      endpoint: CORE_URLS.GET_CORE_MANAGEMENT_LOV,
      method: requestType.POST,
      payload,
    });
    return apiResponse;
  } catch (error: any) {
    const status: IApiStatus = {
      code: 'NETWORK_ERROR',
      type: 'ERROR',
      desc: error.message || 'Unknown network error',
    };
    return {
      status,
      successfulResponse: false,
    };
  }
};

export default getLov;
