import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { UpdateBiomatricStatusProps } from './update-biomatric-status.interface';
import updateBiomatricStatusMock from './update-biomatric-status.mock';
import updateBiomatricStatus from './update-biomatric-status.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../core.urls', () => ({
  UPDATE_BIOMATRIC_STATUS: 'update-biomatric-status-url',
}));
jest.mock('./update-biomatric-status.mock');

describe('updateBiomatricStatus', () => {
  const mockPayload: UpdateBiomatricStatusProps = {
    walletNumber: '123456',
    // add other payload properties here if needed
  };
  const mockApiResponse = { ok: true, data: 'mock data' };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await updateBiomatricStatus(mockPayload);
    expect(result).toBe(updateBiomatricStatusMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await updateBiomatricStatus(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${CORE_URLS.UPDATE_BIOMATRIC_STATUS}/${mockPayload.walletNumber}`,
      method: requestType.POST,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await updateBiomatricStatus(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await updateBiomatricStatus(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await updateBiomatricStatus(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
