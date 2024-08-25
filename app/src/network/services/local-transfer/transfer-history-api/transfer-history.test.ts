import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferMock from './transfer-history';
import { LocalTransferReqParams } from './transfer-history.interface';
import getlocalTransaction from './transfer-history.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../local-transfer.urls', () => ({
  get_transaction: jest.fn(),
}));
jest.mock('@app/network/services/core/transaction/transaction.mock');

describe('getlocalTransaction', () => {
  const mockPayload: LocalTransferReqParams = { walletNumber: '123456' };
  const mockApiResponse = { ok: true, data: 'mock data' };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getlocalTransaction(mockPayload);
    expect(result).toBe(localTransferMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.get_transaction as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getlocalTransaction(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${mockPayload.walletNumber}`,
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.get_transaction as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getlocalTransaction(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.get_transaction as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getlocalTransaction(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.get_transaction as jest.Mock).mockReturnValue(`url/${mockPayload.walletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getlocalTransaction(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
