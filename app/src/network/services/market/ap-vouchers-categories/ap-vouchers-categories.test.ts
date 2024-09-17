import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import apVoucherCategories from './ap-vouchers-categories.mcok';
import getApVoucherCategories from './ap-vouchers-categories.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../market.urls', () => ({
  GET_AP_VOUCHER_CATEGORIES: 'get-ap-voucher-categories-url',
}));

describe('getApVoucherCategories', () => {
  const mockApiResponse = {
    status: { type: 'SUCCESS' },
    response: {
      categories: [
        { code: '3', desc: 'Entertainment', addtionalAttribute1: 'الترفيه' },
        { code: '11', desc: 'Food & beverages', addtionalAttribute1: 'المأكولات والمشروبات' },
      ],
    },
    successfulResponse: true,
  };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getApVoucherCategories();
    expect(result).toBe(apVoucherCategories);
  });

  it('should call apiCall with correct parameters and return API response when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getApVoucherCategories();

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: MARKET_URLS.GET_AP_VOUCHER_CATEGORIES,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ status: { type: 'FAILURE' } });

    const result = await getApVoucherCategories();

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getApVoucherCategories();

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getApVoucherCategories();

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
