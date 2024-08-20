import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferEditBeneficiaryMock from './edit-beneficiary';
import editLocalTransferBeneficiary from './edit-beneficiary.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../local-transfer.urls', () => ({
  EDIT_LOCAL_TRANSFER_BENEFICIARY: jest.fn(),
}));

describe('editLocalTransferBeneficiary', () => {
  const mockPayload = {
    nickname: 'John Doe',
  };

  const mockApiResponse = {
    data: localTransferEditBeneficiaryMock.data,
    successfulResponse: true,
    status: localTransferEditBeneficiaryMock.status,
  };

  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await editLocalTransferBeneficiary('beneficiaryCode', mockPayload);
    expect(result).toEqual(localTransferEditBeneficiaryMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.EDIT_LOCAL_TRANSFER_BENEFICIARY as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await editLocalTransferBeneficiary('beneficiaryCode', mockPayload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: 'url',
      method: requestType.PUT,
      payload: mockPayload,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.EDIT_LOCAL_TRANSFER_BENEFICIARY as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await editLocalTransferBeneficiary('beneficiaryCode', mockPayload);

    expect(result).toEqual({
      status: { code: 'NETWORK_ERROR', type: 'ERROR', desc: 'Network error' },
      successfulResponse: false,
    });
  });

  it('should return "Unknown network error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.EDIT_LOCAL_TRANSFER_BENEFICIARY as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await editLocalTransferBeneficiary('beneficiaryCode', mockPayload);

    expect(result).toEqual({
      status: { code: 'NETWORK_ERROR', type: 'ERROR', desc: 'Unknown network error' },
      successfulResponse: false,
    });
  });
});
