import printCardPrepareService from './print-card-prepare.service';
import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import PHYSICAL_CARD_URLS from '../physical-card.urls';
import printCardPrepareMockResponse from './print-card-prepare.mock';
import { PrintCardPreparePayloadTypes, PrintCardPrepareResponseTypes } from './print-card-prepare.interface';
import { getDeviceInfo } from '@app/network/utilities';
import requestType from '@app/network/request-types.network';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');
const mockedApiCall = apiCall as jest.Mock;

describe('printCardPrepareService', async () => {
  const walletNumber = '9876543210';
  const payload: PrintCardPreparePayloadTypes = {
    cardIndex: "124",
    deviceInfo: await getDeviceInfo(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock response when MOCK_API_RESPONSE is true', async () => {
    // Set the constant to mock API
    constants.MOCK_API_RESPONSE = true;

    const result = await printCardPrepareService(walletNumber, payload);

    expect(result).toEqual(printCardPrepareMockResponse);
  });

  it('should call apiCall with correct parameters and return API response', async () => {
    // Disable mock API
    constants.MOCK_API_RESPONSE = false;

    // Mock the apiCall to return a successful response
    const mockApiResponse: PrintCardPrepareResponseTypes = printCardPrepareMockResponse;

    mockedApiCall.mockResolvedValueOnce(mockApiResponse);

    const result = await printCardPrepareService(walletNumber, payload);

    expect(mockedApiCall).toHaveBeenCalledWith({
      endpoint: PHYSICAL_CARD_URLS.print_card_prepare(walletNumber),
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should handle API call failure and throw an error', async () => {
    // Simulate a failure in the API call
    mockedApiCall.mockRejectedValueOnce(new Error('API Error'));

    try {
      await printCardPrepareService(walletNumber, payload);
    } catch (error) {
      expect(error).toEqual(new Error('API Error'));
    }

    expect(mockedApiCall).toHaveBeenCalledWith({
      endpoint: PHYSICAL_CARD_URLS.print_card_prepare(walletNumber),
      method: requestType.POST,
      payload,
    });
  });
});
