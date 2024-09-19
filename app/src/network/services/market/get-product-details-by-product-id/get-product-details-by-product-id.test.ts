import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import { GetProductDetailsByProductIdPayloadProps } from './get-product-details-by-product-id.interface';
import getProductDetailsByProductIdMock from './get-product-details-by-product-id.mock';
import getProductDetailsByProductId from './get-product-details-by-product-id.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../market.urls', () => ({
  GET_PRODUCT_DETAILS_BY_PRODUCT_ID: (merchantId: string, productId: string) =>
    `get-product-details-url/${merchantId}/${productId}`,
}));
jest.mock('./get-product-details-by-product-id.mock');

describe('getProductDetailsByProductId', () => {
  const mockPayload: GetProductDetailsByProductIdPayloadProps = {
    marchantId: 'merchant123',
    productId: 'product456',
  };
  const mockApiResponse = { status: { type: 'SUCCESS' }, data: { details: 'mock product details' } };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getProductDetailsByProductId(mockPayload);
    expect(result).toBe(getProductDetailsByProductIdMock);
  });

  it('should call apiCall with correct parameters and return API response when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getProductDetailsByProductId(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `get-product-details-url/${mockPayload.marchantId}/${mockPayload.productId}`,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ status: { type: 'FAILURE' } });

    const result = await getProductDetailsByProductId(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getProductDetailsByProductId(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getProductDetailsByProductId(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
