import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import cancelRejectRequestService from './cancel-reject-request.service';
import cancelRejectRequestMockResponse from './cancel-reject-request.mock';
import REQUEST_MANAGEMENT_URLS from '../request-management.urls';
import UpdateRequestTypes from '../update-request.types';

jest.mock('@network/services/api-call.service');

describe('cancelRejectRequestService', () => {
  const walletNumber = '1234567890';
  const transactionId = 'abc123';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock response when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const result = await cancelRejectRequestService(walletNumber, transactionId, UpdateRequestTypes.cancel);

    expect(result).toEqual(cancelRejectRequestMockResponse);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    constants.MOCK_API_RESPONSE = false;

    await cancelRejectRequestService(walletNumber, transactionId, UpdateRequestTypes.cancel);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: REQUEST_MANAGEMENT_URLS.cancelRejectRequest(walletNumber, transactionId, UpdateRequestTypes.cancel),
      method: requestType.POST,
    });
  });

  it('should return API response when successfulResponse is true', async () => {
    constants.MOCK_API_RESPONSE = false;

    const mockApiResponse = cancelRejectRequestMockResponse;

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await cancelRejectRequestService(walletNumber, transactionId, UpdateRequestTypes.cancel);

    expect(result).toEqual(mockApiResponse);
  });

  it('should return apiResponseNotOk when successfulResponse is false', async () => {
    constants.MOCK_API_RESPONSE = false;

    const mockApiResponse = {
      status: { code: '400', message: 'Bad Request' },
      response: null,
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await cancelRejectRequestService(walletNumber, transactionId, UpdateRequestTypes.cancel);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error object when apiCall throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const mockError = new Error('Network error');
    (apiCall as jest.Mock).mockRejectedValue(mockError);

    const result = await cancelRejectRequestService(walletNumber, transactionId, UpdateRequestTypes.cancel);

    expect(result).toEqual({ error: 'Network error' });
  });
});
