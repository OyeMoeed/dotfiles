import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';
import { IDeveiceInfo } from '../id-renewal/id-renewal.interface';

interface ChangePasswordProps {
  passCode?: string;
  walletNumber?: string;
  body?: {
    oldPassword?: string;
    mobileNumber?: string;
    authentication?: {
      transactionId?: string;
    };
    passCode?: string;
    deviceInfo?: IDeveiceInfo;
  }
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
