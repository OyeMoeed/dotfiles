import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferDeleteBeneficiaryMock from './delete-beneficiary';
import deleteLocalTransferBeneficiary from './delete-beneficiary.service'; // Correct function import

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../local-transfer.urls', () => ({
  DELETE_LOCAL_TRANSFER_BENEFICIARY: jest.fn(),
}));

describe('deleteLocalTransferBeneficiary', () => {
  const mockApiResponse = {
    successfulResponse: true,
    status: localTransferDeleteBeneficiaryMock.status,
  };

  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await deleteLocalTransferBeneficiary('beneficiaryCode');
    expect(result).toEqual(localTransferDeleteBeneficiaryMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.DELETE_LOCAL_TRANSFER_BENEFICIARY as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await deleteLocalTransferBeneficiary('beneficiaryCode');

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: 'url',
      method: requestType.DELETE,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.DELETE_LOCAL_TRANSFER_BENEFICIARY as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await deleteLocalTransferBeneficiary('beneficiaryCode');

    expect(result).toEqual({
      status: { code: 'NETWORK_ERROR', type: 'ERROR', desc: 'Network error' },
      successfulResponse: false,
    });
  });

  it('should return "Unknown network error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.DELETE_LOCAL_TRANSFER_BENEFICIARY as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await deleteLocalTransferBeneficiary('beneficiaryCode');

    expect(result).toEqual({
      status: { code: 'NETWORK_ERROR', type: 'ERROR', desc: 'Unknown network error' },
      successfulResponse: false,
    });
  });
});
