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

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  headers?: any;
}

interface ApiResponseNotOk {
  apiResponseNotOk: true;
}

interface ApiError {
  error: string;
}

export {
  ApiError,
  ApiResponse,
  ApiResponseNotOk,
  DeviceInfoProps,
  MockAPIDataProps,
  MockAPIOkProp,
  MockAPIStatusProps,
};
