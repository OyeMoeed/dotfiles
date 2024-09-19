import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import MARKET_URLS from '../market.urls';
import apVoucherIsActive from './ap-voucher-is-active.mock';
import cehckApVoucherIsActive from './ap-voucher-is-active.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../market.urls', () => ({
  CHECK_AP_VOUCHER_ISACTIVE: 'check-ap-voucher-isactive-url',
}));
jest.mock('./ap-voucher-is-active.mock');

describe('cehckApVoucherIsActive', () => {
  const mockApiResponse = { status: { type: 'SUCCESS' }, data: { isActive: true } };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await cehckApVoucherIsActive();
    expect(result).toBe(apVoucherIsActive);
  });

  it('should call apiCall with correct parameters and return API response when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await cehckApVoucherIsActive();

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: MARKET_URLS.CHECK_AP_VOUCHER_ISACTIVE,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ status: { type: 'FAILURE' } });

    const result = await cehckApVoucherIsActive();

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await cehckApVoucherIsActive();

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await cehckApVoucherIsActive();

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
