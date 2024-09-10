// Import necessary interfaces
import { MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber: string;
}

// Define the TransferItem interface
interface TransferItem {
  amount: string;
  receiverWalletNumber: string;
  senderWalletNumber: string;
  receiverName: string;
  trnsDateTime: string;
  bankFeeAmt: string | null;
  receiverMobile: string;
  senderMobile: string;
  feeAmt: string | null;
  parentRequestID: string;
  senderName: string;
  requestID: string;
  vatAmt: string | null;
  bankVATAmt: string | null;
  userNotes: string;
  status: 'initiated' | 'executed' | 'failed'; // Assuming status is one of these two values
}

// Define the WalletToWalletTransferResponseDetails interface that extends MockAPIDataProps with a specific response
interface WalletToWalletTransferResponseDetails extends MockAPIDataProps {
  data: {
    transferRequestsResult: {
      groupedCategories: {
        RECEIVED: TransferItem[];
        SENT: TransferItem[];
      };
    };
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the WalletToWalletTransferMockProps interface from WalletToWalletTransferResponseDetails and MockAPIOkProp
interface WalletToWalletTransferMockProps extends MockAPIOkProp {
  data: WalletToWalletTransferResponseDetails['data']; // Reference 'data' directly without nesting again
  successfulResponse: WalletToWalletTransferResponseDetails['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

export { WalletNumberProp, WalletToWalletTransferMockProps };
