import DeviceInfo from 'react-native-device-info';

export const getDeviceInfo = async (): Promise<object> => {
  const [deviceId, PlatformName, PlatformVersion, deviceName] = await Promise.all([
    DeviceInfo.getUniqueId(),
    DeviceInfo.getSystemName(),
    DeviceInfo.getSystemVersion(),
    DeviceInfo.getDeviceName(),
  ]);

  const deviceInfo = {
    deviceId,
    PlatformName,
    PlatformVersion,
    deviceName,
  };

  return deviceInfo;
};
