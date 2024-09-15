interface EncryptionVariableProps {
  veriable: string;
  encryptionKey: string;
  encryptionPrefix: string;
}

interface DeviceInfoProps {
  deviceId: string;
  platform: string;
  platformVersion: string;
  deviceName: string;
  hashCode: string;
}

export { DeviceInfoProps, EncryptionVariableProps };
