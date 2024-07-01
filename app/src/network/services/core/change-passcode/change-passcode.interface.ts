import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface ChangePasswordProps {
  passCode?: string;
  oldPassword?: string;
  mobileNumber?: string;
  authentication?: {
    transactionId?: string;
  };
  walletNumber: string;
  deviceInfo?: DeviceInfoProps;
}

// Define the chnagePasscodeMockMockResponse interface (empty object)
interface chnagePasscodeMockMockResponse {}

// Define the chnagePasscodeMockMockDataProps interface that extends MockAPIDataProps with specific response details
interface chnagePasscodeMockMockDataProps extends MockAPIDataProps {
  response: chnagePasscodeMockMockResponse;
}

// Extend the chnagePasscodeMockMockProps interface from chnagePasscodeMockMockDataProps and MockAPIOkProp
interface ChnagePasscodeMockMockProps extends MockAPIOkProp {
  data: chnagePasscodeMockMockDataProps;
}

export { ChangePasswordProps, ChnagePasscodeMockMockProps };
