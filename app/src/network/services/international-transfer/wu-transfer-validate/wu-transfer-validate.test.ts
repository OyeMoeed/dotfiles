import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { ValidateWUTransferPayload } from './wu-transfer-validate.interface';
import wuValidateTransfer from './wu-transfer-validate.service';

jest.mock('@network/services/api-call.service');

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

describe('wuValidateTransfer', () => {
  const payload: ValidateWUTransferPayload = {
    amount: '150',
    amountCurrency: 'SAR',
    wuTransactionReason: 'WUS.2',
    transferPurposeCode: 'W001',
    feeAmount: '123',
    vatAmount: '555',
    bankFeeAmount: '456',
    bankVatAmount: '789',
    promoCode: null,
    deviceInfo: {
      platformVersion: '10',
      deviceId: 'WAP,WAP,WAP',
      deviceName: 'WAP',
      platform: 'ANDROID',
    },
  };

  const beneficiaryCode = '2436';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return apiResponse when apiCall is successful and response is ok', async () => {
    const mockApiResponse = {
      apiResponseNotOk: true,
    };

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await wuValidateTransfer(payload, beneficiaryCode);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/validate`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when apiResponse is not ok', async () => {
    const mockApiResponse = {
      ok: false,
      apiResponseNotOk: true,
    };

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await wuValidateTransfer(payload, beneficiaryCode);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/validate`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error object when apiCall throws an error', async () => {
    const mockError = new Error('Unknown error');

    (apiCall as jest.Mock).mockRejectedValue(mockError);

    const result = await wuValidateTransfer(payload, beneficiaryCode);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/validate`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });

  it('should return an error object with a default message when apiCall throws an unknown error', async () => {
    (apiCall as jest.Mock).mockRejectedValue(undefined);

    const result = await wuValidateTransfer(payload, beneficiaryCode);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/validate`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });
});
