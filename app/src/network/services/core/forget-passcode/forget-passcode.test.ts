import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import forgetPasscode from './forget-passcode.service';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('forgetPasscode', () => {
  const mockApiResponse = { ok: true };
  const mockPayload = { email: 'test@example.com' };
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Clear mock implementation and reset mock calls before each test
    (apiCall as jest.Mock).mockClear();
    mockDispatch.mockClear();
  });

  it('returns the API response if it is successful', async () => {
    // Mock a successful API response
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    // Call the forgetPasscode function
    const result = await forgetPasscode(mockPayload, mockDispatch);

    // Check if the apiCall function was called with the correct arguments
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.POST,
      payload: mockPayload,
    });

    // Check if the result matches the mock API response
    expect(result).toEqual(mockApiResponse);

    // Ensure that the dispatch function was not called
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('returns { apiResponseNotOk: true } if the API response is not successful', async () => {
    // Mock an unsuccessful API response
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    // Call the forgetPasscode function
    const result = await forgetPasscode(mockPayload, mockDispatch);

    // Check if the apiCall function was called with the correct arguments
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.POST,
      payload: mockPayload,
    });

    // Check if the result contains { apiResponseNotOk: true }
    expect(result).toEqual({ apiResponseNotOk: true });

    // Ensure that the dispatch function was not called
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('returns an error message if there is an error during the API call', async () => {
    // Mock an error during the API call
    const errorMessage = 'Mock error message';
    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Call the forgetPasscode function
    const result = await forgetPasscode(mockPayload, mockDispatch);

    // Check if the apiCall function was called with the correct arguments
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.POST,
      payload: mockPayload,
    });

    // Check if the result contains the error message
    expect(result).toEqual({ error: errorMessage });

    // Ensure that the dispatch function was not called
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
