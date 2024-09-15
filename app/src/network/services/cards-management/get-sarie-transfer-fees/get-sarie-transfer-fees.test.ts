import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import GetSarieTransferFeesMockResponse from './get-sarie-trasnfer-fees.mock';
import { GetSarieTransferFeesResponseTypes } from './get-sarie-transfer-fees.interface';
import getSarieTransferFees from './get-sarie-transfer-fees.service';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('getSarieTransferFees', () => {
  const walletNumber = '20004255';
  const bankCode = 'INMA';
  const amount = '12';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const response = await getSarieTransferFees(walletNumber, bankCode, amount);

    expect(response).toEqual(GetSarieTransferFeesMockResponse);
  });

  it('should return API response on successful API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse: GetSarieTransferFeesResponseTypes = {
      status: {
        code: 'I000000',
        type: 'SUCCESS',
        desc: 'Alinmapay.cardManagement.feesInquiry.getFees.messege.success',
        sessionReference: 'SSPAYCc99bdb9298954d199be4dc260b510102',
        requestReference: '04268131955827439390',
      },
      response: {
        feeAmount: '0.00',
        vatAmount: '0.00',
        bankFeeAmount: '0.00',
        bankVatAmount: '0.00',
      },
      successfulResponse: true,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await getSarieTransferFees(walletNumber, bankCode, amount);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.GET,
    });

    expect(response).toEqual(apiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse = {
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await getSarieTransferFees(walletNumber, bankCode, amount);

    expect(response).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when API call throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const errorMessage = 'Network error';

    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await getSarieTransferFees(walletNumber, bankCode, amount);

    expect(response).toEqual({ error: errorMessage });
  });

  it('should return "Unknown error" when API call throws an error without a message', async () => {
    constants.MOCK_API_RESPONSE = false;

    (apiCall as jest.Mock).mockRejectedValue(new Error());

    const response = await getSarieTransferFees(walletNumber, bankCode, amount);

    expect(response).toEqual({ error: 'Unknown error' });
  });
});
