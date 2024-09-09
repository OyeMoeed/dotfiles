import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import TRANSFERS_URLS from '../transfer.urls';
import transferDetailsMock from './transfer-details.mock';
import getWalletToWalletTransferDetails from './transfer-details.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../transfer.urls', () => ({
  get_wallet_to_wallet_transfer: jest.fn(),
}));
jest.mock('./transfer-details.mock');

describe('getWalletToWalletTransferDetails', () => {
  const mockWalletNumber = '123456';
  const mockPayload = {
    trxReqType: 'COUT_GIFT',
    trxId: 'EPY08099J8M75',
    deviceInfo: {
      platformVersion: '10',
      deviceId: 'WAP,WAP,WAP',
      deviceName: 'WAP',
      platform: 'ANDROID',
    },
  };
  const mockApiResponse = { ok: true, response: transferDetailsMock };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getWalletToWalletTransferDetails(mockWalletNumber, mockPayload);
    expect(result).toEqual(transferDetailsMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (TRANSFERS_URLS.get_wallet_to_wallet_transfer as jest.Mock).mockReturnValue(`url/${mockWalletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getWalletToWalletTransferDetails(mockWalletNumber, mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${mockWalletNumber}`,
      method: requestType.POST,
      payload: mockPayload,
    });
    expect(result).toEqual(mockApiResponse.response);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (TRANSFERS_URLS.get_wallet_to_wallet_transfer as jest.Mock).mockReturnValue(`url/${mockWalletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getWalletToWalletTransferDetails(mockWalletNumber, mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (TRANSFERS_URLS.get_wallet_to_wallet_transfer as jest.Mock).mockReturnValue(`url/${mockWalletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getWalletToWalletTransferDetails(mockWalletNumber, mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (TRANSFERS_URLS.get_wallet_to_wallet_transfer as jest.Mock).mockReturnValue(`url/${mockWalletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getWalletToWalletTransferDetails(mockWalletNumber, mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
