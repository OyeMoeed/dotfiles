import { DeviceInfoProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define a modified Status interface without sessionReference
interface PrePareLoginStatusProps extends Omit<MockAPIStatusProps, 'sessionReference'> {
  requestReference: string;
}

// Define the Authentication interface
interface Authentication {
  transactionId: string;
}

// Define the PrePareLoginResponse interface
interface PrePareLoginResponse {
  encryptionPrefix: string;
  currentDate: string;
  inactiveTimeoutPeriodInMins: string;
  isEncryptionRequired: boolean;
  passwordEncryptionKey: string;
  passwordEncryptionPrefix: string;
}

// Define the PrePareLoginDataProps interface that extends MockAPIDataProps with a specific response and modified status
interface PrePareLoginDataProps {
  successfulResponse: boolean;
  status: PrePareLoginStatusProps;
  authentication: Authentication;
  response: PrePareLoginResponse;
}

// Extend the PrePareLoginApiResponse interface from PrePareLoginDataProps and MockAPIOkProp
interface PrePareLoginApiResponseProps extends MockAPIOkProp {
  passwordEncryptionPrefix: string;
  passwordEncryptionKey: string;
  data: PrePareLoginDataProps;
  inactiveTimeoutPeriodInMins?: number | string;
}

interface PrePareLoginPayload {
  deviceInfo: DeviceInfoProps;
}

export {
  PrePareLoginApiResponseProps,
  PrePareLoginDataProps,
  PrePareLoginPayload,
  PrePareLoginResponse,
  PrePareLoginStatusProps,
};
