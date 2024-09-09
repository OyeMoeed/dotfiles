// Import necessary interfaces
import { DeviceInfoProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface TransferDetailsPayload {
  trxReqType: string;
  trxId: string;
  deviceInfo: DeviceInfoProps;
}

// Define the DetailsItem interface
interface TransferDetailsRes {
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
  status: string;
  giftCategory: string;
}

// Define the TransferResponseDetails
interface TransferDetailsResponseDetails {
  response: TransferDetailsRes;
  successfulResponse: boolean;
}

// Extend the TransferDetailsMockProps interface from TransferDetailsResponseDetails and MockAPIOkProp
interface TransferDetailsMockProps extends TransferDetailsResponseDetails, MockAPIOkProp {
  status: MockAPIStatusProps; // Include status directly
  apiResponseNotOk?: boolean;
}

export { TransferDetailsMockProps, TransferDetailsPayload, TransferDetailsRes };
