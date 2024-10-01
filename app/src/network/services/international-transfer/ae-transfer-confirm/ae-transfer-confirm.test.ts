import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import aeTransferMock from './ae-transfer-confirm.mock';
import alinmaExpressTransferConfirm from './ae-transfer-confirm.service';

jest.mock('@network/services/api-call.service');
jest.mock('../international-transfer.urls', () => ({
  alinma_express_transfer: jest.fn(),
}));

describe('alinmaExpressTransferConfirm', () => {
  const walletNumber = 'wallet123';
  const payload = {
    otp: '1234',
    otpRef: 'OTP08099LMZT8',
    amount: '1.00',
    authentication: {
      transactionId: 'TRPAYC113071d0c5304a429fb3462451307077',
    },
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
    (apiCall as jest.Mock).mockResolvedValue({
      response: aeTransferMock,
      ok: true,
    });

    const result = await alinmaExpressTransferConfirm(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${walletNumber}/express/transfer/confirm`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual(aeTransferMock);
  });

  it('should return error status when apiCall throws an error with a message', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express_transfer as jest.Mock).mockReturnValue('url');
    const error = new Error('Network error');
    (apiCall as jest.Mock).mockRejectedValue(error);

    const result = await alinmaExpressTransferConfirm(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${walletNumber}/express/transfer/confirm`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({
      error: 'Network error',
    });
  });

  it('should return error status with "Unknown error" when apiCall throws an error without a message', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express_transfer as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await alinmaExpressTransferConfirm(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${walletNumber}/express/transfer/confirm`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({
      error: 'Unknown error',
    });
  });
});
