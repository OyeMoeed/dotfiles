import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { WalletNumberProp } from './offers.interface';
import getOffersMock from './offers.mock';
import getOffers from './offers.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../core.urls', () => ({
  GET_OFFERS: jest.fn(),
}));
jest.mock('./offers.mock');

describe('getOffers', () => {
  const mockPayload: WalletNumberProp = { walletNumber: '123456' };
  const mockApiResponse = { ok: true, data: 'mock data' };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getOffers(mockPayload);
    expect(result).toBe(getOffersMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (CORE_URLS.GET_OFFERS as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getOffers(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${mockPayload.walletNumber}`,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (CORE_URLS.GET_OFFERS as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getOffers(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (CORE_URLS.GET_OFFERS as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getOffers(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (CORE_URLS.GET_OFFERS as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getOffers(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
