import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { WalletNumberProp } from './applepay-topup.interface';
import applepayTopupMock from './applepay-topup.mock';
import applepayTopup from './applepay-topup.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../core.urls', () => ({
  APPLEPAY_TOP_UP: jest.fn(),
}));
jest.mock('./applepay-topup.mock');

describe('applepayTopup', () => {
  const mockPayload: WalletNumberProp = { walletNumber: '123456' };
  const mockApiResponse = { ok: true, data: 'mock data' };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await applepayTopup(mockPayload);
    expect(result).toBe(applepayTopupMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (CORE_URLS.APPLEPAY_TOP_UP as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await applepayTopup(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${mockPayload.walletNumber}`,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true, apiResponse } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (CORE_URLS.APPLEPAY_TOP_UP as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await applepayTopup(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true, apiResponse: { ok: false } });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (CORE_URLS.APPLEPAY_TOP_UP as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await applepayTopup(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (CORE_URLS.APPLEPAY_TOP_UP as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await applepayTopup(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
