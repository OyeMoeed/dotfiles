import { apiEndpoints } from '@network/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { requestType } from '@utilities/enums';
import Config from 'react-native-config';
import { queryParam } from '..';
import { EncryptionApiResponse } from './types';

const baseUrl = Config.BASE_URL; // Set baseurl from config

export const ENCRYPTION_REDUCER_KEY = 'getEncryptionKeys';
export const encryptionApi = createApi({
  reducerPath: ENCRYPTION_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: (builder) => ({
    getEncryptionsKeys: builder.query<EncryptionApiResponse, string>({
      query: (payload) =>
        queryParam({
          url: apiEndpoints.GET_ENCRYPTION_KEYS,
          method: requestType.GET
        })
    })
  })
});

export const { useGetEncryptionsKeys } = encryptionApi;
