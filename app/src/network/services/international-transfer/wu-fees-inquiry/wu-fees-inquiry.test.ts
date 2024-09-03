import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import { FeesInquiryPayload } from './wu-fees-inquiry.interface';
import westerUnionFeesInquiry from './wu-fees-inquiry.service';

jest.mock('@network/services/api-call.service');

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

describe('westerUnionFeesInquiry', () => {
  const payload: FeesInquiryPayload = {
    amount: '200',
    amountCurrency: 'SAR',
    convertedAmountCurrency: 'JOD',
    deductFeesFromAmount: false,
    promoCode: null,
    deviceInfo: {
      platformVersion: '10',
      deviceId: 'WAP,WAP,WAP',
      deviceName: 'WAP',
      platform: 'ANDROID',
    },
  };

  const beneficiaryCode = '22220';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return apiResponse when apiCall is successful and response is ok', async () => {
    const mockApiResponse = {
      apiResponseNotOk: true,
    };

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await westerUnionFeesInquiry(payload, beneficiaryCode);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/fees-inquiry`,
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

    const result = await westerUnionFeesInquiry(payload, beneficiaryCode);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/fees-inquiry`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error object when apiCall throws an error', async () => {
    const mockError = new Error('Unknown error');

    (apiCall as jest.Mock).mockRejectedValue(mockError);

    const result = await westerUnionFeesInquiry(payload, beneficiaryCode);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/fees-inquiry`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });

  it('should return an error object with a default message when apiCall throws an unknown error', async () => {
    (apiCall as jest.Mock).mockRejectedValue(undefined);

    const result = await westerUnionFeesInquiry(payload, beneficiaryCode);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${INTERNATIONAL_TRANSFERS_URLS.western_union_beneficiaries()}/${beneficiaryCode}/wu/fees-inquiry`,
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });
});
