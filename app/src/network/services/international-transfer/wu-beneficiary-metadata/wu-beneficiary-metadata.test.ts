import constants from '@app/constants/constants';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import wuBeneficiaryMetaDataMock from './wu-beneficiary-metadata.mock';
import getWUBeneficiaryMetaData from './wu-beneficiary-metadata.service';

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../international-transfer.urls', () => ({
  get_western_union_beneficiaries_metadata: jest.fn(),
}));
jest.mock('./beneficiary-metadata.mock');

describe('getWUBeneficiaryMetaData', () => {
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getWUBeneficiaryMetaData();
    expect(result).toBe(wuBeneficiaryMetaDataMock);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_metadata as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getWUBeneficiaryMetaData();

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_metadata as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getWUBeneficiaryMetaData();

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (INTERNATIONAL_TRANSFERS_URLS.get_western_union_beneficiaries_metadata as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getWUBeneficiaryMetaData();

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
