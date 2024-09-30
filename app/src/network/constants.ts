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
      id: 0,
      title: 'preProd',
    },
    {
      id: 1,
      title: 'uat',
    },
    {
      id: 2,
      title: 'sit',
    },
    {
      id: 3,
      title: 'dev',
    },
  ],
};

export default constants;
