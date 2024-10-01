import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import aeTransferMock from './ae-transfer-prepare.mock';
import alinmaExpressTransferPrepare from './ae-transfer-prepare.service';

jest.mock('@network/services/api-call.service');
jest.mock('../international-transfer.urls', () => ({
  alinma_express_transfer: jest.fn(),
}));

describe('alinmaExpressTransferPrepare', () => {
  const walletNumber = 'wallet123';
  const payload = {
    beneficiaryCode: '10587981-8',
    transferPurpose: 'Salary payment',
    feesAmount: '1',
    vatAmount: '1',
    bankFeesAmount: '1',
    bankVatAmount: '1',
    amountCurrency: 'KSA',
    amount: '1',
    deductFeesFromAmount: false,
    deviceInfo: {
      platformVersion: '10',
      deviceId: 'WAP,WAP,BVcWAP',
      deviceName: 'WAP',
      platform: 'ANDROID',
      locationDetails: {
        district: 'Al Olaya',
        city: 'Riyadh',
        country: 'SA',
        latitude: '24.7136256',
        longitude: '46.6812928',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return expected response on successful API call', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express_transfer as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ response: aeTransferMock });

    const result = await alinmaExpressTransferPrepare(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${walletNumber}/express/transfer/prepare`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual(aeTransferMock);
  });

  it('should return apiResponseNotOk status when API response is not OK', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express_transfer as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ response: { ok: false, apiResponseNotOk: true } });

    const result = await alinmaExpressTransferPrepare(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${walletNumber}/express/transfer/prepare`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ apiResponseNotOk: true, response: { ok: false, apiResponseNotOk: true } });
  });

  it('should return NETWORK_ERROR status when apiCall throws an error', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express_transfer as jest.Mock).mockReturnValue('url');
    const error = new Error('Network error');
    (apiCall as jest.Mock).mockRejectedValue(error);

    const result = await alinmaExpressTransferPrepare(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${walletNumber}/express/transfer/prepare`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({
      error: error.message,
    });
  });

  it('should return NETWORK_ERROR status with "Unknown error" when apiCall throws an error without a message', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express_transfer as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await alinmaExpressTransferPrepare(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${walletNumber}/express/transfer/prepare`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({
      error: 'Unknown error',
    });
  });
});
