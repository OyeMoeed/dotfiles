import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import TRANSFERS_URLS from '../transfer.urls';
import executeGiftMock from './execute-gift.mock';
import executeGift from './execute-gift.service';
import { TransactionTrxReqType } from '../../core/transaction/transaction.interface';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../transfer.urls', () => ({
  get_wallet_to_wallet_transfer: jest.fn(),
}));
jest.mock('./execute-gift.mock', () => executeGiftMock);

describe('executeGift', () => {
  const mockWalletNumber = '123456';
  const mockPayload = {
    trxReqType: TransactionTrxReqType.GIFT,
    trxId: 'EPY08099J8M75',
    deviceInfo: {
      platformVersion: '10',
      deviceId: 'WAP,WAP,WAP',
      deviceName: 'WAP',
      platform: 'ANDROID',
    },
  };

  const mockApiResponse = {
    status: {
      code: 'I000000',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
      sessionReference: 'SSPAYC0a088beff71b4b0ab1adfcb20bd1c5fa',
      requestReference: '03196435797915013355',
    },
    response: {},
    successfulResponse: true,
    ok: true,
  };

  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await executeGift(mockWalletNumber, mockPayload);
    expect(result).toEqual(executeGiftMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (TRANSFERS_URLS.get_wallet_to_wallet_transfer as jest.Mock).mockReturnValue(`url/${mockWalletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await executeGift(mockWalletNumber, mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${mockWalletNumber}`,
      method: requestType.POST,
      payload: mockPayload,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (TRANSFERS_URLS.get_wallet_to_wallet_transfer as jest.Mock).mockReturnValue(`url/${mockWalletNumber}`);
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await executeGift(mockWalletNumber, mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (TRANSFERS_URLS.get_wallet_to_wallet_transfer as jest.Mock).mockReturnValue(`url/${mockWalletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await executeGift(mockWalletNumber, mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (TRANSFERS_URLS.get_wallet_to_wallet_transfer as jest.Mock).mockReturnValue(`url/${mockWalletNumber}`);
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await executeGift(mockWalletNumber, mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
