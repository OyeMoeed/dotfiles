import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service'; // Import the apiCall function
import loginUser from './login.service'; // Adjust the import path accordingly

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('loginUser', () => {
  const mockApiResponse = { ok: true, data: { token: 'mockToken' } };
  const mockPayload = { username: 'mockUsername', password: 'mockPassword' };

  beforeEach(() => {
    // Clear mock implementation before each test
    (apiCall as jest.Mock).mockClear();
  });

  it('returns the API response if it is successful', async () => {
    // Mock a successful API response
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    // Call the loginUser function
    const result = await loginUser(mockPayload);

    // Check if the apiCall function was called with the correct arguments
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.POST,
      payload: mockPayload,
    });

    // Check if the result matches the mock API response
    expect(result).toEqual(mockApiResponse);
  });

  it('returns { apiResponseNotOk: true } if the API response is not successful', async () => {
    // Mock an unsuccessful API response
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    // Call the loginUser function
    const result = await loginUser(mockPayload);

    // Check if the apiCall function was called with the correct arguments
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.POST,
      payload: mockPayload,
    });

    // Check if the result contains { apiResponseNotOk: true }
    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('returns an error message if there is an error during the API call', async () => {
    // Mock an error during the API call
    const errorMessage = 'Mock error message';
    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Call the loginUser function
    const result = await loginUser(mockPayload);

    // Check if the apiCall function was called with the correct arguments
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.POST,
      payload: mockPayload,
    });

    // Check if the result contains the error message
    expect(result).toEqual({ error: errorMessage });
  });
});
