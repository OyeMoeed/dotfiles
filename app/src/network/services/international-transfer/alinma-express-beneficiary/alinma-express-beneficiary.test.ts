import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import alinmaExpressBeneficiariesData from './alinma-express-beneficiary.mock';
import getAlinmaExpressBeneficiaries from './alinma-express-beneficiary.service';

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../international-transfer.urls', () => ({
  get_alinma_express_beneficiaries: jest.fn(),
}));
jest.mock('./alinma-express-beneficiary.mock');

describe('alinmaExpressBeneficiariesData', () => {
  const mockApiResponse = { ok: true, data: 'mock data' };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getAlinmaExpressBeneficiaries();
    expect(result).toBe(alinmaExpressBeneficiariesData);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.get_alinma_express_beneficiaries as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getAlinmaExpressBeneficiaries();

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: 'url',
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.get_alinma_express_beneficiaries as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getAlinmaExpressBeneficiaries();

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.get_alinma_express_beneficiaries as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getAlinmaExpressBeneficiaries();

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.get_alinma_express_beneficiaries as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getAlinmaExpressBeneficiaries();

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
