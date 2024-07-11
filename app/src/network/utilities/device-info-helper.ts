import DeviceInfo from 'react-native-device-info';

export const getDeviceInfo = async (): Promise<object> => {
  const [deviceId, platform, platformVersion, deviceName] = await Promise.all([
    DeviceInfo.getUniqueId(),
    DeviceInfo.getSystemName(),
    DeviceInfo.getSystemVersion(),
    DeviceInfo.getDeviceName(),
  ]);

  const deviceInfo = {
    deviceId,
    platform,
    platformVersion,
    deviceName,
  };

  return deviceInfo;
};
