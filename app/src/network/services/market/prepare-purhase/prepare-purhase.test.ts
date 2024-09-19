import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import preparePurchaseMock from './prepare-purchase.mock';
import { PreparePurchasePayloadProps } from './prepare-purhase.interface';
import preparePurchase from './prepare-purhase.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../market.urls', () => ({
  PREPARE_PURCHASE: 'prepare-purchase-url',
}));
jest.mock('./prepare-purchase.mock');

describe('preparePurchase', () => {
  const mockPayload: PreparePurchasePayloadProps = {
    // Add properties that are expected in PreparePurchasePayloadProps
    someProperty: 'value',
  };
  const mockApiResponse = { status: { type: 'SUCCESS' }, data: { response: 'mock response' } };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await preparePurchase(mockPayload);
    expect(result).toBe(preparePurchaseMock);
  });

  it('should call apiCall with correct parameters and return API response when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await preparePurchase(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: MARKET_URLS.PREPARE_PURCHASE,
      method: requestType.POST,
      payload: mockPayload,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ status: { type: 'FAILURE' } });

    const result = await preparePurchase(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await preparePurchase(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await preparePurchase(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
