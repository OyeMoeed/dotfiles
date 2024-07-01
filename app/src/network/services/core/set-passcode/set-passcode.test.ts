import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import apiCall from '@network/services/api-call.service';
import setPasscodeMock from './set-passcode.mock';
import setPasscode from './set-passcode.service';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('setPasscode', () => {
  const mockPayload = { passcode: '123456' };
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Clear mock implementation and reset mock calls before each test
    (apiCall as jest.Mock).mockClear();
    mockDispatch.mockClear();
  });

  it('uses mock response when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    // Call the setPasscode function
    const result = await setPasscode(mockPayload, mockDispatch);

    // Check if the result matches the mock API response
    expect(result).toEqual(setPasscodeMock);

    // Ensure that the dispatch function was called with the correct arguments
    expect(mockDispatch).toHaveBeenCalledWith(setWalletInfo({ walletNumber: setPasscodeMock.data.walletNumber }));
  });

  it('calls the API and dispatches setWalletInfo on success', async () => {
    constants.MOCK_API_RESPONSE = false;

    const mockApiResponse = {
      ok: true,
      data: { walletNumber: 'wallet123' },
    };

    // Mock a successful API response
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    // Call the setPasscode function
    const result = await setPasscode(mockPayload, mockDispatch);

    // Check if the apiCall function was called with the correct arguments
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.POST,
      payload: mockPayload,
    });

    // Check if the result matches the mock API response
    expect(result).toEqual(mockApiResponse);

    // Ensure that the dispatch function was called with the correct arguments
    expect(mockDispatch).toHaveBeenCalledWith(setWalletInfo({ walletNumber: 'wallet123' }));
  });

  it('returns { apiResponseNotOk: true } if the API response is not successful', async () => {
    constants.MOCK_API_RESPONSE = false;

    // Mock an unsuccessful API response
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    // Call the setPasscode function
    const result = await setPasscode(mockPayload, mockDispatch);

    // Check if the result contains { apiResponseNotOk: true }
    expect(result).toEqual({ apiResponseNotOk: true });

    // Ensure that the dispatch function was not called
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('returns an error message if there is an error during the API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    // Mock an error during the API call
    const errorMessage = 'Mock error message';
    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Call the setPasscode function
    const result = await setPasscode(mockPayload, mockDispatch);

    // Check if the result contains the error message
    expect(result).toEqual({ error: errorMessage });

    // Ensure that the dispatch function was not called
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
