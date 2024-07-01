// Define the Status interface
interface MockAPIStatusProps {
  sessionReference: string;
  code: string;
  requestReference: string;
  type: string;
  desc: string;
}

// Define the Data interface
interface MockAPIDataProps {
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Define the ok property type
type MockAPIOkProp = {
  ok: boolean;
};

type DeviceInfoProps = {
  platformVersion: string;
  deviceId: string;
  deviceName: string;
  platform: string;
};

export { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps };
