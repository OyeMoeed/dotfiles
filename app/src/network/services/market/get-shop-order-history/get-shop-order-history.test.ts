import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { getShopOrderHistoryPayloadProps } from './get-shop-order-history.interface';
import getShopOrderHistoryMock from './get-shop-order-history.mock';
import getShopOrderHistory from './get-shop-order-history.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../market.urls', () => ({
  GET_SHOP_ORDER_HISTORY: (walletNumber: string) => `get-shop-order-history-url/${walletNumber}`,
}));
jest.mock('./get-shop-order-history.mock');

describe('getShopOrderHistory', () => {
  const mockPayload: getShopOrderHistoryPayloadProps = { walletNumber: 'wallet123' };
  const mockApiResponse = { status: { type: 'SUCCESS' }, data: { orders: 'mock orders' } };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getShopOrderHistory(mockPayload);
    expect(result).toBe(getShopOrderHistoryMock);
  });

  it('should call apiCall with correct parameters and return API response when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getShopOrderHistory(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `get-shop-order-history-url/${mockPayload.walletNumber}`,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ status: { type: 'FAILURE' } });

    const result = await getShopOrderHistory(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getShopOrderHistory(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getShopOrderHistory(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
