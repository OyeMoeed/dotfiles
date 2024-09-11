import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localBeneficiaryMetaDataMock from './local-beneficiary-metadata.mock';
import getlocalBeneficiaryMetaData from './local-beneficiary-metadata.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../local-transfer.urls', () => ({
  get_local_transfer_beneficiaries_metadata: jest.fn(),
}));
jest.mock('./local-beneficiary-metadata');

describe('getlocalBeneficiaryMetaData', () => {
  const mockApiResponse = { ok: true, data: 'mock data' };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;
    const result = await getlocalBeneficiaryMetaData();
    expect(result).toBe(localBeneficiaryMetaDataMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    constants.MOCK_API_RESPONSE = false;
    (LOCAL_TRANSFERS_URLS.get_local_transfer_beneficiaries_metadata as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getlocalBeneficiaryMetaData();

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: 'url',
      method: requestType.GET,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    constants.MOCK_API_RESPONSE = false;
    (LOCAL_TRANSFERS_URLS.get_local_transfer_beneficiaries_metadata as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getlocalBeneficiaryMetaData();

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    constants.MOCK_API_RESPONSE = false;
    (LOCAL_TRANSFERS_URLS.get_local_transfer_beneficiaries_metadata as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getlocalBeneficiaryMetaData();

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    constants.MOCK_API_RESPONSE = false;
    (LOCAL_TRANSFERS_URLS.get_local_transfer_beneficiaries_metadata as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getlocalBeneficiaryMetaData();

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
