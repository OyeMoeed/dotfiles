import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import wuTransferMock from './wu-transfer.mock';
import westernUnionTransfer from './wu-transfer.service';

jest.mock('@network/services/api-call.service');
jest.mock('../international-transfer.urls', () => ({
  western_union_transfer: jest.fn(),
}));

describe('westernUnionTransfer', () => {
  const beneficiaryCode = 'beneficiary123';
  const payload = {
    authentication: {
      transactionId: 'transactionId123',
    },
    otpRef: 'otpRef123',
    otp: 'otp123',
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
    (INTERNATIONAL_TRANSFERS_URLS.western_union_transfer as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ response: wuTransferMock });

    const result = await westernUnionTransfer(beneficiaryCode, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${beneficiaryCode}/wu/transfer`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual(wuTransferMock);
  });

  it('should return apiResponseNotOk status when apiCall returns a non-OK response', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.western_union_transfer as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ response: { ok: false } });

    const result = await westernUnionTransfer(beneficiaryCode, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${beneficiaryCode}/wu/transfer`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ apiResponseNotOk: true, response: { ok: false } });
  });

  it('should return NETWORK_ERROR status when apiCall throws an error', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.western_union_transfer as jest.Mock).mockReturnValue('url');
    const error = new Error('Network error');
    (apiCall as jest.Mock).mockRejectedValue(error);

    const result = await westernUnionTransfer(beneficiaryCode, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${beneficiaryCode}/wu/transfer`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });

  it('should return NETWORK_ERROR status with "Unknown error" when apiCall throws an error without a message', async () => {
    (INTERNATIONAL_TRANSFERS_URLS.western_union_transfer as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await westernUnionTransfer(beneficiaryCode, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `url/${beneficiaryCode}/wu/transfer`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });
});
