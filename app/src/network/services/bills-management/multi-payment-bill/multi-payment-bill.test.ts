import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import multiPaymentBillService from './multi-payment-bill.service';
import multiPaymentBillMockResponse from './multi-payment-bill.mock';
import { MultiPaymentBillPayloadTypes, MultiPaymentBillResponseTypes } from './multi-payment-bill.interface';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('multiPaymentBillService', () => {
  const payload: MultiPaymentBillPayloadTypes = {
    otpRef: 'OTP233595P934',
    otp: '1234',
    billPaymentInfos: [
      {
        billerId: '002',
        billNumOrBillingAcct: '002245820000',
        amount: 5,
        dueDateTime: '24-11-2014',
        billIdType: '0',
        billingCycle: '002_2019',
        billIndex: '0',
        serviceDescription: 'ELCT',
        billerName: '002 - Saudi Electric Company',
        walletNumber: '10587981',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const response = await multiPaymentBillService(payload);

    expect(response).toEqual(multiPaymentBillMockResponse);
  });

  it('should return API response on successful API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse: MultiPaymentBillResponseTypes = multiPaymentBillMockResponse;

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await multiPaymentBillService(payload);

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
        billPaymentResponses: [],
      },
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await multiPaymentBillService(payload);

    expect(response).toEqual({ apiResponseNotOk: true, apiResponse });
  });

  it('should return an error message when API call throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const errorMessage = 'Network error';

    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await multiPaymentBillService(payload);

    expect(response).toEqual({ error: errorMessage });
  });

  it('should return "Unknown error" when API call throws an error without a message', async () => {
    constants.MOCK_API_RESPONSE = false;

    (apiCall as jest.Mock).mockRejectedValue(new Error());

    const response = await multiPaymentBillService(payload);

    expect(response).toEqual({ error: 'Unknown error' });
  });
});
