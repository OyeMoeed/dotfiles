import requestType from '@app/network/request-types.network';
import ENDPOINTS from '@app/network/utilities/api-endpoints';
import { getDeviceInfo } from '@app/network/utilities';
import { setAppData } from '@app/store/slices/app-data-slice';
import apiCall from '@network/services/api-call.service';
import prepareLogin from './prepare-login.service';

describe('prepareLogin', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches setAppData with transactionId and deviceInfo when apiCall is successful', async () => {
    const mockDeviceInfo = { deviceId: '12345', platform: 'iOS', version: '14.4', deviceName: 'iPhone' };
    const mockApiResponse = { ok: true, data: { authentication: { transactionId: 'abc123' } } };

    (getDeviceInfo as jest.Mock).mockResolvedValue(mockDeviceInfo);
    (apiCall as jest.Mock).mockResolvedValue(mockApiResponse);

    await prepareLogin(dispatch);

    expect(getDeviceInfo).toHaveBeenCalled();
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: ENDPOINTS.PREPARE_LOGIN,
      method: requestType.POST,
      payload: mockDeviceInfo,
    });
    expect(dispatch).toHaveBeenCalledWith(setAppData({ transactionId: 'abc123', deviceInfo: mockDeviceInfo }));
  });

  it('logs an error when apiCall fails', async () => {
    const mockDeviceInfo = { deviceId: '12345', platform: 'iOS', version: '14.4', deviceName: 'iPhone' };
    const mockError = new Error('Something went wrong');

    (getDeviceInfo as jest.Mock).mockResolvedValue(mockDeviceInfo);
    (apiCall as jest.Mock).mockRejectedValue(mockError);

    console.error = jest.fn();

    await prepareLogin(dispatch);

    expect(getDeviceInfo).toHaveBeenCalled();
    expect(apiCall).toHaveBeenCalledWith({
      endpoint: ENDPOINTS.PREPARE_LOGIN,
      method: requestType.POST,
      payload: mockDeviceInfo,
    });
    expect(dispatch).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error preparing login:', mockError);
  });
});
