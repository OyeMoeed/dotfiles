/**
 * Defines a set of API endpoints.
 */
const constants = {
  GET_ENCRYPTION_KEYS: '/encryption',
  SUCCESS_RESPONSE: 200,
  ERROR_CODES: {
    NETWORK_CONNECTION_ERROR: 408,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
  },
  API_VERSION_NAME: 'api-version',
  MAX_RECORD: 'max-record',
  API_ENV: [
    {
      title: 'preProd',
    },
    {
      title: 'uat',
    },
    {
      title: 'sit',
    },
    {
      title: 'dev',
    },
  ],
};

export default constants;
