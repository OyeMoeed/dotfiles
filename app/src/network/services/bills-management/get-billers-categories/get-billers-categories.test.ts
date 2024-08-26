import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import getBillersCategoriesService from './get-billers-categories.service';
import getBillersCategoriesMockResponse from './get-billers-categories.mock';
import { GetBillersCategoriesResponseTypes } from './get-billers-categories.interface';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('getBillersCategoriesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const response = await getBillersCategoriesService();

    expect(response).toEqual(getBillersCategoriesMockResponse);
  });

  it('should return API response on successful API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse: GetBillersCategoriesResponseTypes = {
      status: {
        code: 'I000000',
        type: 'SUCCESS',
        desc: 'retail.msg.default.success',
        sessionReference: 'SSPAYC29bf4368e6c04861af0256da48d444a7',
        requestReference: '06851820381011026737',
      },
      response: {
        categories: [
          { id: '001', name: 'Utilities' },
          { id: '002', name: 'Telecom' },
        ],
      },
      successfulResponse: true,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await getBillersCategoriesService();

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: 'GET',
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
        categories: [],
      },
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await getBillersCategoriesService();

    expect(response).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when API call throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const errorMessage = 'Network error';

    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await getBillersCategoriesService();

    expect(response).toEqual({ error: errorMessage });
  });

  it('should return "Unknown error" when API call throws an error without a message', async () => {
    constants.MOCK_API_RESPONSE = false;

    (apiCall as jest.Mock).mockRejectedValue(new Error());

    const response = await getBillersCategoriesService();

    expect(response).toEqual({ error: 'Unknown error' });
  });
});
