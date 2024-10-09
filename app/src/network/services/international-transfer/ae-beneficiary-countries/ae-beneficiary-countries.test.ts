import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import aeBeneficiaryCountriesMock from './ae-beneficiary-countries.mock';
import getAEBeneficiaryCountries from './ae-beneficiary-countries.service';

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../international-transfer.urls', () => ({
  alinma_express: jest.fn(),
}));
jest.mock('./beneficiary-countries.mock');

describe('getAEBeneficiaryCountries', () => {
  const mockApiResponse = { ok: true, response: 'mock data' };
  const mockErrorResponse = { message: 'Network error' };
  const mockPayload = { alinmaExpressType: 'Test' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getAEBeneficiaryCountries(mockPayload);
    expect(result).toBe(aeBeneficiaryCountriesMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getAEBeneficiaryCountries(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: 'url',
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getAEBeneficiaryCountries(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getAEBeneficiaryCountries(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.alinma_express as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getAEBeneficiaryCountries(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
