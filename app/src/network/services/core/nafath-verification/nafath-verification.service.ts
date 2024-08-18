import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { IActivationAbsherReq, PrepareIdRenewalProp } from './nafath-verification.interface';
import Config from 'react-native-config';
import axios, { AxiosResponse } from 'axios';
import { handleApiResponse } from '../../api-call.interceptors';
import { ApiResponse } from '../../services.interface';
const { NAFATH_MANAGE } = Config;
const headers = { 'contentType': 'application/json', 'charset': 'utf-8' };

const getNafathRandom = async (payload: PrepareIdRenewalProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return {};
  }
  try {

    console.log(payload)
    let channelId = payload?.channelId;

    let body = {
      requestId: payload?.requestId
    }
    let endpoint = `${NAFATH_MANAGE}${CORE_URLS.GET_NAFATH_RANDOM(channelId)}`

    const response: AxiosResponse<ApiResponse<any>>  = await axios({
      method: requestType.POST,
      url: endpoint,
      data: body,
      headers: headers
    })

    try {
      return handleApiResponse<any>(response);
    } catch (error: any) {
    }


  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};


const getNafathInquiry = async (payload: PrepareIdRenewalProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return {};
  }
  try {


    let channelId = payload?.channelId;
    let requestId = payload?.requestId;


    let endpoint = `${NAFATH_MANAGE}${CORE_URLS.GET_NAFATH_INQUIRY(channelId, requestId)}`


    const response: AxiosResponse<ApiResponse<any>> = await axios({
      method: requestType.GET,
      url: endpoint,
      headers: headers
    })

    try {
      return handleApiResponse<any>(response);
    } catch (error: any) {
    }

  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
};



const updateWalletTierReq = async (activationAbsherReq: IActivationAbsherReq) => {
  try {
    let walletNumber = activationAbsherReq?.walletNumber;

    const apiResponse: any = await apiCall({
      endpoint: CORE_URLS.UPDATE_WALLET_TIER(walletNumber),
      method: requestType.POST,
      payload: activationAbsherReq,
    });

    if (apiResponse?.data?.status?.type === 'SUCCESS') {
      return apiResponse;
    }
    return { apiResponseNotOk: true };
  } catch (error: any) {
    return { error: error.message || 'Unknown error' };
  }
}


export { getNafathRandom, getNafathInquiry, updateWalletTierReq };
