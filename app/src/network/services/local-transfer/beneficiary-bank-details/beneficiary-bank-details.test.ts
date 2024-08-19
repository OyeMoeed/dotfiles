import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import LOCAL_TRANSFERS_URLS from '../local-transfer.urls';
import localTransferBeneficiaryBankMock from './beneficiary-bank-details';
import { LocalTransferBeneficiaryBankMockProps } from './beneficiary-bank-details.interface';
import getlocalTransferBeneficiaryBankDetails from './beneficiary-bank-details.service';

jest.mock('@network/services/api-call.service');
jest.mock('@app/constants/constants', () => ({
  MOCK_API_RESPONSE: false,
}));
jest.mock('../local-transfer.urls', () => ({
  GET_LOCAL_BENEFICIARIES_BANK_DETAILS: jest.fn(),
}));

describe('getlocalTransferBeneficiaryBankDetails', () => {
  const mockApiResponse: LocalTransferBeneficiaryBankMockProps = {
    data: {
      bankCode: '000011',
      bankName: 'Alinma',
      correspondingBankCode: '9000',
      beneficiaryType: 'active',
    },
    status: {
      code: 'I000000',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
      sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
      requestReference: '06851820381011026813',
    },
    successfulResponse: true,
    ok: true,
  };

  const mockErrorResponse = { message: 'Network error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mock data when MOCK_API_RESPONSE is true', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = true;
    const result = await getlocalTransferBeneficiaryBankDetails({
      countryCode: 'SA',
      bankCode: '000011',
      iban: '123456789',
      beneficiaryType: 'active',
    });
    expect(result).toBe(localTransferBeneficiaryBankMock);
  });

  it('should call apiCall with correct parameters when MOCK_API_RESPONSE is false', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.GET_LOCAL_BENEFICIARIES_BANK_DETAILS as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getlocalTransferBeneficiaryBankDetails({
      countryCode: 'SA',
      bankCode: '000011',
      iban: '123456789',
      beneficiaryType: 'active',
    });

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: 'url',
      method: requestType.GET,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when api response is not ok', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.GET_LOCAL_BENEFICIARIES_BANK_DETAILS as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockResolvedValue({ ok: false });

    const result = await getlocalTransferBeneficiaryBankDetails({
      countryCode: 'SA',
      bankCode: '000011',
      iban: '123456789',
      beneficiaryType: 'active',
    });

    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error message when an error occurs', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.GET_LOCAL_BENEFICIARIES_BANK_DETAILS as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue(mockErrorResponse);

    const result = await getlocalTransferBeneficiaryBankDetails({
      countryCode: 'SA',
      bankCode: '000011',
      iban: '123456789',
      beneficiaryType: 'active',
    });

    expect(result).toEqual({ error: mockErrorResponse.message });
  });

  it('should return "Unknown error" when an error occurs without a message', async () => {
    (constants.MOCK_API_RESPONSE as boolean) = false;
    (LOCAL_TRANSFERS_URLS.GET_LOCAL_BENEFICIARIES_BANK_DETAILS as jest.Mock).mockReturnValue('url');
    (apiCall as jest.Mock).mockRejectedValue({});

    const result = await getlocalTransferBeneficiaryBankDetails({
      countryCode: 'SA',
      bankCode: '000011',
      iban: '123456789',
      beneficiaryType: 'active',
    });

    expect(result).toEqual({ error: 'Unknown error' });
  });
});
