import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import CORE_URLS from '../core.urls';
import { ChangePasswordProps } from './change-passcode.interface';
import chnagePasscodeMock from './change-passcode.mock';
import changePasscodeReq from './change-passcode.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../core.urls', () => ({
  CHANGE_PASSCODE: 'change-passcode-url',
}));
jest.mock('./change-passcode.mock');

describe('changePasscodeReq', () => {
  const mockPayload: ChangePasswordProps = { walletNumber: '123456' };
  const mockApiResponse = { ok: true, data: 'mock data' };
  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await changePasscodeReq(mockPayload);
    expect(result).toBe(chnagePasscodeMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await changePasscodeReq(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: `${CORE_URLS.CHANGE_PASSCODE}/${mockPayload.walletNumber}`,
      method: requestType.POST,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await changePasscodeReq(mockPayload);

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await changePasscodeReq(mockPayload);

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await changePasscodeReq(mockPayload);

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
