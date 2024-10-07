import { DeleteBillResponse } from './bills-management/delete-bill/delete-bill.interface';

// Define the Status interface
interface MockAPIStatusProps {
  sessionReference: string;
  code: string;
  requestReference: string;
  type: string;
  desc: string;
  translation?: string;
}

// Define the Data interface
interface MockAPIDataProps {
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Define the ok property type
type MockAPIOkProp = {
  ok?: boolean;
};

type DeviceInfoProps = {
  platformVersion?: string;
  deviceId?: string;
  deviceName?: string;
  platform?: string;
  deviceInfo?: any;
  locationDetails?: IlocationDetails;
  hashCode?: string;
};

export interface IlocationDetails {
  district?: string;
  city?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
}

interface IApiStatus {
  sessionReference?: string;
  code: string;
  requestReference?: string;
  type: 'ERROR' | 'SUCCESS';
  desc: string;
}

interface ApiResponse<T> {
  data?: DeleteBillResponse;
  status: IApiStatus;
  response?: T;
  successfulResponse?: boolean;
  authentication?: {
    transactionId: string;
  };
  headers?: {};
  paginationInfo?: {
    matchedRecords?: string;
    sentRecords: string;
  };
}

interface ApiResponseNotOk {
  apiResponseNotOk: true;
}

interface ApiError {
  error: string;
}

enum ErrorStatus {
  FORCE_UPDATE = 'E430995',
  FORCE_MAINTENANCE = 'EC100001',
}

export {
  ApiError,
  ApiResponse,
  ApiResponseNotOk,
  DeviceInfoProps,
  IApiStatus,
  MockAPIDataProps,
  MockAPIOkProp,
  MockAPIStatusProps,
  ErrorStatus,
};
