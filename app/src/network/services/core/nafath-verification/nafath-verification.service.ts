import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import Config from 'react-native-config';
import CORE_URLS from '../core.urls';
import { IActivationAbsherReq, PrepareIdRenewalProp } from './nafath-verification.interface';

const { NAFATH_MANAGE } = Config;
const headers = { contentType: 'application/json', charset: 'utf-8' };

const getNafathRandom = async (payload: PrepareIdRenewalProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return {};
  }

  const apiResponse = apiCall({
    endpoint: CORE_URLS.GET_NAFATH_RANDOM(payload?.channelId),
    method: requestType.POST,
    payload: {
      requestId: payload?.requestId,
    },
    headers,
    baseURL: NAFATH_MANAGE,
  });

  return apiResponse;
};

const getNafathInquiry = async (payload: PrepareIdRenewalProp): Promise<unknown> => {
  if (constants.MOCK_API_RESPONSE) {
    return {};
  }

  const apiResponse = apiCall({
    endpoint: CORE_URLS.GET_NAFATH_INQUIRY(payload?.channelId, payload?.requestId),
    method: requestType.GET,
    headers,
    baseURL: NAFATH_MANAGE,
  });

  return apiResponse;
};

const updateWalletTierReq = async (activationAbsherReq: IActivationAbsherReq) => {
  const walletNumber = activationAbsherReq?.walletNumber;

  const apiResponse: any = await apiCall({
    endpoint: CORE_URLS.UPDATE_WALLET_TIER(walletNumber),
    method: requestType.POST,
    payload: activationAbsherReq,
  });

  return apiResponse;
};

export { getNafathInquiry, getNafathRandom, updateWalletTierReq };
