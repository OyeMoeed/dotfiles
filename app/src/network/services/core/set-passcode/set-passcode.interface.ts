import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface SetPasscodeServiceProps {
  authentication?: { transactionId?: string };
  transactionId?: string;
  deviceInfo?: DeviceInfoProps;
  mobileNumber?: string;
  passCode?: string;
  poiNumber?: string;
}

// Define the SetPasscodeMockDataProps interface that extends MockAPIDataProps with specific response details
interface SetPasscodeMockDataProps extends MockAPIDataProps {
  channelId: string;
  hasErsalAccount: boolean;
  hasInmaAccount: boolean;
  iamRequestId: string;
  walletNumber: string;
  code: string;
  desc: string;
  requestReference: string;
  sessionReference: string;
  type: string;
}

// Extend the SetPasscodeMockProps interface from SetPasscodeMockDataProps and MockAPIOkProp
interface SetPasscodeMockProps extends MockAPIOkProp {
  data: SetPasscodeMockDataProps;
}

export { SetPasscodeMockProps, SetPasscodeServiceProps };
