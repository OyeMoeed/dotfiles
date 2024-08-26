import SmsRetrieverService from '@app/services/sms-retriever.service';
import DeviceInfo from 'react-native-device-info';

export const getDeviceInfo = async (): Promise<object> => {
  const [deviceId, platform, platformVersion, deviceName, hashCode] = await Promise.all([
    DeviceInfo.getUniqueId(),
    DeviceInfo.getSystemName().toUpperCase(),
    DeviceInfo.getSystemVersion(),
    DeviceInfo.getDeviceName(),
    await SmsRetrieverService.getAppHash(),
  ]);

  const deviceInfo = {
    deviceId,
    platform,
    platformVersion,
    deviceName,
    hashCode,
  };

  return deviceInfo;
};
