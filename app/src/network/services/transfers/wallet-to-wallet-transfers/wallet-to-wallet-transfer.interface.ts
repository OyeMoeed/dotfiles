// Import necessary interfaces
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

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
  status: 'initiated' | 'executed' | 'failed'; // Assuming status is one of these three values
  giftCategory: string;
}

// Define the WalletToWalletTransferResponseDetails
interface WalletToWalletTransferResponseDetails {
  response: {
    transferRequestsResult: {
      groupedCategories: {
        RECEIVED: TransferItem[];
        SENT: TransferItem[];
      };
    };
  };
  successfulResponse: boolean;
}

// Extend the WalletToWalletTransferMockProps interface from WalletToWalletTransferResponseDetails and MockAPIOkProp
interface WalletToWalletTransferMockProps extends WalletToWalletTransferResponseDetails, MockAPIOkProp {
  status: MockAPIStatusProps; // Include status directly
}

export { TransferItem, WalletNumberProp, WalletToWalletTransferMockProps };
