import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { ApiResponse } from '../../services.interface';
import CORE_URLS from '../core.urls';
import {
  IGetCoreLovPayload,
  IGetCoreLovResponse,
  IGetCoreManagementLovPayload,
  IGetCoreManagementLovResponse,
  IGetLovPayload,
  IGetLovResponse,
} from './get-lov.interface';
import getLovByCode from './get-lov.mock';

const getLov = async (payload: IGetLovPayload): Promise<ApiResponse<IGetLovResponse> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = getLovByCode(payload.lovType);
    return response;
  }

  const apiResponse = await apiCall<IGetLovResponse>({
    endpoint: CORE_URLS.GET_LOV,
    method: requestType.POST,
    payload,
  });
  return apiResponse;
};

export const getCoreLov = async (
  payload: IGetCoreLovPayload,
): Promise<ApiResponse<IGetCoreLovResponse> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    const response = getLovByCode(payload.lovType);
    return response;
  }

  const apiResponse = await apiCall<IGetCoreLovResponse>({
    endpoint: CORE_URLS.GET_CORE_LOV,
    method: requestType.POST,
    payload,
  });
  return apiResponse;
};

export const geCoreManagementLov = async (
  payload: IGetCoreManagementLovPayload,
): Promise<ApiResponse<IGetCoreManagementLovResponse> | undefined> => {
  const apiResponse = await apiCall<IGetCoreManagementLovResponse>({
    endpoint: CORE_URLS.GET_CORE_MANAGEMENT_LOV,
    method: requestType.POST,
    payload,
  });
  return apiResponse;
};

export default getLov;
