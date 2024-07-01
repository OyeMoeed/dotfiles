import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { WalletNumberProp } from './get-wallet.interface';
import getWalletInfoMock from './get-wallet.mock';
import getWalletInfo from './get-wallet.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../core.urls', () => ({
  GET_WALLET_INFO: 'get-wallet-info-url',
}));
jest.mock('./get-wallet.mock');
jest.mock('@app/store/slices/wallet-info-slice', () => ({
  setWalletInfo: jest.fn(),
}));

describe('getWalletInfo', () => {
  const mockPayload: WalletNumberProp = { walletNumber: '123456' };
  const mockDispatch = jest.fn();
  const mockApiResponse = { ok: true, data: { response: 'mock data' } };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data and dispatch setWalletInfo when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getWalletInfo(mockPayload, mockDispatch);
    expect(result).toBe(getWalletInfoMock);
    expect(mockDispatch).toHaveBeenCalledWith(setWalletInfo(getWalletInfoMock.data.response));
  });

  it('should call apiCall with correct parameters and dispatch setWalletInfo when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getWalletInfo(mockPayload, mockDispatch);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${CORE_URLS.GET_WALLET_INFO}/${mockPayload.walletNumber}`,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
    expect(mockDispatch).toHaveBeenCalledWith(setWalletInfo(mockApiResponse.data.response));
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getWalletInfo(mockPayload, mockDispatch);

    expect(result).toEqual({ apiResponseNotOk: true });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getWalletInfo(mockPayload, mockDispatch);

    expect(result).toEqual({ error: mockErrorResponse.message });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getWalletInfo(mockPayload, mockDispatch);

    expect(result).toEqual({ error: 'Unknown error' });
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
