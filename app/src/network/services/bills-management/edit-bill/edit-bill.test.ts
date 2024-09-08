import requestType from '@app/network/request-types.network';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { EditBillPayloadTypes } from './edit-bill.interface';
import editBillService from './edit-bill.service';
import editBillMockResponse from './edit-bill.mock';

jest.mock('@network/services/api-call.service');

describe('editBillService', () => {
  const payload: EditBillPayloadTypes = {
    billNumOrBillingAcct: '1332343434',
    billId: 'BILL233592CP3LC5',
    billNickname: 'Bob',
    walletNumber: '10142',
    deviceInfo: { platformVersion: '10', deviceId: 'WAP,WAP,WAP', deviceName: 'WAP', platform: 'ANDROID' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return apiResponse when apiCall is successful and response is ok', async () => {
    const mockApiResponse = editBillMockResponse;

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await editBillService(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: BILLS_MANAGEMENT_URLS.edit_bill(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual(mockApiResponse);
  });

  it('should return { apiResponseNotOk: true } when apiResponse is not ok', async () => {
    const mockApiResponse = {
      ok: false,
      data: { success: false },
    };

    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await editBillService(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: BILLS_MANAGEMENT_URLS.edit_bill(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ apiResponseNotOk: true });
  });

  it('should return an error object when apiCall throws an error', async () => {
    const mockError = new Error('Network error');

    (apiCall as jest.Mock).mockRejectedValue(mockError);

    const result = await editBillService(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: BILLS_MANAGEMENT_URLS.edit_bill(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ error: 'Network error' });
  });

  it('should return an error object with a default message when apiCall throws an unknown error', async () => {
    (apiCall as jest.Mock).mockRejectedValue(undefined);

    const result = await editBillService(payload);

    expect(apiCall).toHaveBeenCalledWith({
      endpoint: BILLS_MANAGEMENT_URLS.edit_bill(),
      method: requestType.PUT,
      payload,
    });
    expect(result).toEqual({ error: 'Unknown error' });
  });
});
