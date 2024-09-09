import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferAddBeneficiaryMock from './add-new-beneficiary';
import addLocalTransferBeneficiary from './add-new-beneficiary.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../local-transfer.urls', () => ({
  add_local_transfer_beneficiary: jest.fn(),
}));
jest.mock('./add-new-beneficiary');

describe('addLocalTransferBeneficiary', () => {
  const mockPayload = {
    beneficiaryBankDetail: {
      bankCode: '001',
      correspondingBankCode: '002',
      bankName: 'Test Bank',
    },
    countryCode: 'SA',
    nickname: 'Test Beneficiary',
    fullName: 'John Doe',
    beneficiaryAccountNumber: '1234567890',
    dynamicFields: [{ index: '0', value: 'Dynamic Value' }],
    currency: 'SAR',
    remittanceType: 'Personal',
  };

  const mockApiResponse = {
    data: localTransferAddBeneficiaryMock.data,
    successfulResponse: true,
    status: localTransferAddBeneficiaryMock.status,
  };

  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await addLocalTransferBeneficiary(mockPayload);
    expect(result).toBe(localTransferAddBeneficiaryMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.add_local_transfer_beneficiary as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await addLocalTransferBeneficiary(mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: 'url',
      method: requestType.POST,
      payload: mockPayload,
    });
    expect(result).toBe(mockApiResponse);
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.add_local_transfer_beneficiary as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await addLocalTransferBeneficiary(mockPayload);

    expect(result).toEqual({
      status: { code: 'NETWORK_ERROR', type: 'ERROR', desc: 'Network error' },
      successfulResponse: false,
    });
  });

  it('should return "Unknown network error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.add_local_transfer_beneficiary as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await addLocalTransferBeneficiary(mockPayload);

    expect(result).toEqual({
      status: { code: 'NETWORK_ERROR', type: 'ERROR', desc: 'Unknown network error' },
      successfulResponse: false,
    });
  });
});
