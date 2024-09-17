import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { PayloadMerchantsCategoryProps } from './get-products-by-category-id.interface';
import apVoucherMarchantsCategory from './get-products-by-category-id.mock';
import getProductsByCategoryId from './get-products-by-category-id.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../market.urls', () => ({
  GET_AP_VOUCHER_MERCHANTS_CATEGORY: (categoryId: string) => `get-products-by-category-id-url/${categoryId}`,
}));
jest.mock('./get-products-by-category-id.mock');

describe('getProductsByCategoryId', () => {
  const mockPayload: PayloadMerchantsCategoryProps = { categoryId: 'category123' };
  const mockApiResponse = { status: { type: 'SUCCESS' }, data: { products: 'mock products' } };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getProductsByCategoryId(mockPayload);
    expect(result).toBe(apVoucherMarchantsCategory);
  });

  it('should call apiCall with correct parameters and return API response when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getProductsByCategoryId(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `get-products-by-category-id-url/${mockPayload.categoryId}`,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ status: { type: 'FAILURE' } });

    const result = await getProductsByCategoryId(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getProductsByCategoryId(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getProductsByCategoryId(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
