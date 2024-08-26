import apiCall from '@network/services/api-call.service';
import requestType from '@app/network/request-types.network';
import { ActivateBeneficiaryPayload } from './local-transfer-activate-beneficiary.interface';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import activateBeneficiary from './local-transfer-activate-beneficiary.service';

jest.mock('@network/services/api-call.service');

describe('activateBeneficiary', () => {
  const payload: ActivateBeneficiaryPayload = {
    beneficiaryCode: '10587981-7',
    activationMethod: 'IVR',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return apiResponse when apiCall is successful and response is ok', async () => {
    const mockApiResponse = {
      ok: true,
      data: { success: true },
    };

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await activateBeneficiary(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: LOCAL_TRANSFERS_URLS.activate_beneficiary(),
      method: requestType.PUT,
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

    const result = await activateBeneficiary(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: LOCAL_TRANSFERS_URLS.activate_beneficiary(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error object when apiCall throws an error', async () => {
    const mockError = new Error('Network error');

    (apiCall as jest.Mock).mockRejectedValue(mockError);

    const result = await activateBeneficiary(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: LOCAL_TRANSFERS_URLS.activate_beneficiary(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ error: 'Network error' });
  });

  it('should return an error object with a default message when apiCall throws an unknown error', async () => {
    (apiCall as jest.Mock).mockRejectedValue(undefined);

    const result = await activateBeneficiary(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: LOCAL_TRANSFERS_URLS.activate_beneficiary(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });
});
