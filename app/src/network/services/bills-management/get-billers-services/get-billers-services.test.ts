import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import { GetBillersServicesResponseTypes } from './get-billers-services.interface';
import getBillersServicesMockResponse from './get-billers-services.mock';
import getBillersServiceProvider from './get-billers-services.service';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('getBillersServiceProvider', () => {
  const billerID = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const response = await getBillersServiceProvider(billerID);

    expect(response).toEqual(getBillersServicesMockResponse);
  });

  it('should return API response on successful API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse: GetBillersServicesResponseTypes = getBillersServicesMockResponse;

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await getBillersServiceProvider(billerID);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.GET,
    });

    expect(response).toEqual(apiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response status type is not SUCCESS', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse = {
      status: {
        code: 400,
        message: 'Bad Request',
        type: ApiResponseStatusType.FAILURE,
      },
      response: {
        servicesList: [],
      },
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await getBillersServiceProvider(billerID);

    expect(response).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when API call throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const errorMessage = 'Network error';

    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await getBillersServiceProvider(billerID);

    expect(response).toEqual({ error: errorMessage });
  });

  it('should return "Unknown error" when API call throws an error without a message', async () => {
    constants.MOCK_API_RESPONSE = false;

    (apiCall as jest.Mock).mockRejectedValue(new Error());

    const response = await getBillersServiceProvider(billerID);

    expect(response).toEqual({ error: 'Unknown error' });
  });
});
