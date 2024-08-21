import apiCall from '@network/services/api-call.service';
import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import LocalTransferPrepareMockResponse from './local-transfer-prepare.mock';
import { LocalTransferPreparePayloadTypes } from './local-transfer-prepare.interface';
import localTransferPrepare from './local-transfer-prepare.service';

// Mock the apiCall function
jest.mock('@network/services/api-call.service');

describe('localTransferPrepare', () => {
  const walletNumber = '123456';
  const payload: LocalTransferPreparePayloadTypes = {
    beneficiaryCode: '10587981-8',
    transferPurpose: 'Salary payment',
    feesAmount: '1',
    vatAmount: '1',
    bankFeesAmount: '1',
    bankVatAmount: '1',
    amountCurrency: 'KSA',
    amount: '1',
    deductFeesFromAmount: false,
    deviceInfo: {
      platformVersion: '10',
      deviceId: 'WAP,WAP,WAP',
      deviceName: 'WAP',
      platform: 'ANDROID',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    constants.MOCK_API_RESPONSE = true;

    const response = await localTransferPrepare(walletNumber, payload);

    expect(response).toEqual(LocalTransferPrepareMockResponse);
  });

  it('should return API response on successful API call', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse = LocalTransferPrepareMockResponse;

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await localTransferPrepare(walletNumber, payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: expect.any(String),
      method: requestType.POST,
      payload,
    });

    expect(response).toEqual(apiResponse);
  });

  it('should return { apiResponseNotOk: true } when API response is not successful', async () => {
    constants.MOCK_API_RESPONSE = false;

    const apiResponse = {
      successfulResponse: false,
    };

    (apiCall as jest.Mock).mockResolvedValue(apiResponse);

    const response = await localTransferPrepare(walletNumber, payload);

    expect(response).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when API call throws an error', async () => {
    constants.MOCK_API_RESPONSE = false;

    const errorMessage = 'Network error';

    (apiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const response = await localTransferPrepare(walletNumber, payload);

    expect(response).toEqual({ error: errorMessage });
  });

  it('should return "Unknown error" when API call throws an error without a message', async () => {
    constants.MOCK_API_RESPONSE = false;

    (apiCall as jest.Mock).mockRejectedValue(new Error());

    const response = await localTransferPrepare(walletNumber, payload);

    expect(response).toEqual({ error: 'Unknown error' });
  });
});
