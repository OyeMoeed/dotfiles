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
  platformVersion?: string;
  deviceId?: string;
  deviceName?: string;
  platform?: string;
  deviceInfo?: any;
};

interface IApiStatus {
  sessionReference?: string;
  code: string;
  requestReference?: string;
  type: 'ERROR' | 'SUCCESS';
  desc: string;
}

interface ApiResponse<T> {
  status: IApiStatus;
  response?: T;
  successfulResponse: boolean;
  authentication?: {
    transactionId: string;
  };
  headers?: {};
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
  IApiStatus,
};