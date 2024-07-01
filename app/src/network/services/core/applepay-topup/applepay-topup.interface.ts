import { MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber: string;
}

// Define the ApplepayTopupMockResponse interface
interface ApplepayTopupMockResponse {
  feeAmount: string;
  bankFeeAmount: string;
  bankVatAmount: string;
  vatAmount: string;
  paymentGateway: string;
}

// Define the ApplepayTopupMockDataProps interface that extends MockAPIDataProps with specific response details
interface ApplepayTopupMockDataProps extends MockAPIDataProps {
  response: ApplepayTopupMockResponse;
}

// Extend the ApplepayTopupMockProps interface from ApplepayTopupMockDataProps and MockAPIOkProp
interface ApplepayTopupMockProps extends MockAPIOkProp {
  data: ApplepayTopupMockDataProps;
}

export { ApplepayTopupMockProps, WalletNumberProp };
