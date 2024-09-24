import constants from '@app/constants/constants';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import { SaveBillPayloadTypes, SaveBillResponseTypes } from './save-bill.interface';
import inquireBillMockResponse from './save-bill.mock';
import getBillersService from './save-bill.service';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('getBillersService', () => {
  const payload: SaveBillPayloadTypes = {
    billerId: '001',
    billNumOrBillingAcct: '05221651245',
    billIdType: '0',
    billerName: '001 - STC',
    deviceInfo: {
      hashCode: 'JVMIhOofJD6',
      platformVersion: '10',
      deviceId: 'a6e16b4414f564b5,samsung,SM-A528B',
      deviceName: 'samsung',
      platform: 'ANDROID',
    },
    billNickname: 'Regular Bill',
    walletNumber: '297792',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const response = await getBillersService(payload);

    expect(response).toEqual(inquireBillMockResponse);
  });

  it('should return API response on successful API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse: SaveBillResponseTypes = inquireBillMockResponse;

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await getBillersService(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: 'POST',
      payload,
    });

    expect(response).toEqual(apiResponse);
  });

  it('should return { apiResponseNotOk: true, apiResponse } when API response status type is not SUCCESS', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse = {
      status: {
        code: 400,
        message: 'Bad Request',
        type: ApiResponseStatusType.FAILURE,
      },
      response: {
        billId: '',
        billStatus: '',
      },
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await getBillersService(payload);

    expect(response).toEqual({ apiResponseNotOk: true, apiResponse });
  });

  it('should return an error message when API call throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const errorMessage = 'Network error';

    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await getBillersService(payload);

    expect(response).toEqual({ error: errorMessage });
  });

  it('should return "Unknown error" when API call throws an error without a message', async () => {
    constants.MOCK_API_RESPONSE = false;

    (apiCall as jest.Mock).mockRejectedValue(new Error());

    const response = await getBillersService(payload);

    expect(response).toEqual({ error: 'Unknown error' });
  });
});
