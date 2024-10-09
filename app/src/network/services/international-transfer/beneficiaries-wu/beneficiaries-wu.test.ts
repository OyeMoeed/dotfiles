import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import INTERNATIONAL_TRANSFERS_URLS from '../international-transfer.urls';
import addWUbeneficiary from './beneficiaries-wu.service';

jest.mock('@network/services/api-call.service');

describe('addWUbeneficiary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const payload = {};

  it('should return apiResponse when apiCall is successful and response is ok', async () => {
    const mockApiResponse = {
      ok: true,
      data: { success: true },
    };

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await addWUbeneficiary(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.post_beneficiaries_wu(),
      method: requestType.POST,
      payload,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when apiResponse is not ok', async () => {
    const mockApiResponse = {
      ok: false,
      data: { success: false },
    };

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await addWUbeneficiary(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.post_beneficiaries_wu(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error object when apiCall throws an error', async () => {
    const mockError = new Error('Network error');

    (apiCall as jest.Mock).mockRejectedValue(mockError);

    const result = await addWUbeneficiary(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.post_beneficiaries_wu(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ error: 'Network error' });
  });

  it('should return an error object with a default message when apiCall throws an unknown error', async () => {
    (apiCall as jest.Mock).mockRejectedValue(undefined);

    const result = await addWUbeneficiary(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: INTERNATIONAL_TRANSFERS_URLS.post_beneficiaries_wu(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });
});
