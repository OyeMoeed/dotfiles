import printCardService from './print-card.service';
import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import PHYSICAL_CARD_URLS from '../physical-card.urls';
import printCardMockResponse from './print-card.mock';
import { PrintCardPayloadTypes, PrintCardResponseTypes } from './print-card.interface';
import { CardCategories } from '@app/utilities';
import { getDeviceInfo } from '@app/network/utilities';
import requestType from '@app/network/request-types.network';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');
const mockedApiCall = apiCall as jest.Mock;

describe('printCardService', async () => {
  const walletNumber = '1234567890';
  const payload: PrintCardPayloadTypes = {
    otp: '1234',
    otpRef: '1111111',
    deviceInfo: await getDeviceInfo(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock response when MOCK_API_RESPONSE is true', async () => {
    // Set the constant to mock API
    constants.MOCK_API_RESPONSE = true;

    const result = await printCardService(walletNumber, payload);

    expect(result).toEqual(printCardMockResponse);
  });

  it('should call apiCall with correct parameters and return API response', async () => {
    // Disable mock API
    constants.MOCK_API_RESPONSE = false;

    // Mock the apiCall to return a successful response
    const mockApiResponse: PrintCardResponseTypes = printCardMockResponse;

    mockedApiCall.mockResolvedValueOnce(mockApiResponse);

    const result = await printCardService(walletNumber, payload);

    expect(mockedApiCall).toHaveBeenCalledWith({
      endpoint: PHYSICAL_CARD_URLS.print_card(walletNumber),
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should handle API call failure and throw an error', async () => {
    // Simulate a failure in the API call
    mockedApiCall.mockRejectedValueOnce(new Error('API Error'));

    try {
      await printCardService(walletNumber, payload);
    } catch (error) {
      expect(error).toEqual(new Error('API Error'));
    }

    expect(mockedApiCall).toHaveBeenCalledWith({
      endpoint: PHYSICAL_CARD_URLS.print_card(walletNumber),
      method: requestType.POST,
      payload,
    });
  });
});
