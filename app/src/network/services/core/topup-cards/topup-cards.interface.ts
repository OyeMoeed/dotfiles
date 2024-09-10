import { MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber?: string;
}

interface CheckOutProp {
  walletNumber?: string;
  checkOutBody?: ICheckOutIdReq;
}

interface CheckStatusProp {
  walletNumber?: string;
  refNumber?: string;
}

interface ICheckOutIdReq {
  cardBrand?: string;
  amount?: string;
  cardRegistrationId?: string;
  deviceInfo?: any;
  paymentDescription?: string;
}
// Define the CardItem interface
interface CardItem {
  expirationYear: string;
  createdAt: string;
  cardBin: string;
  transactionReferenceNumber: string;
  registrationId: string;
  lastDigits: string;
  embossingName: string | null;
  expirationMonth: string;
  cardBrand: string;
  paymentGateway1: string;
  binCountry: string | null;
  token: string;
}

// Define the TopupCardsResponseDetails interface that extends MockAPIDataProps with a specific response
interface TopupCardsResponseDetails extends MockAPIDataProps {
  response: {
    cardList: CardItem[];
  };
  paginationInfo: {
    matchedRecords: string;
    sentRecords: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the TopupCardsMockProps interface from TopupCardsResponseDetails and MockAPIOkProp
interface TopupCardsMockProps extends MockAPIOkProp {
  data: TopupCardsResponseDetails;
}

export interface TopUpCardsRes {
  cardList: TopUpCardItem[];
}

export interface TopUpCardItem {
  registrationId: string;
  cardBin: string;
  lastDigits: string;
  binCountry: any;
  expirationYear: string;
  expirationMonth: string;
  embossingName: any;
  cardBrand: string;
  createdAt: string;
  paymentGateway1: string;
  transactionReferenceNumber: string;
  token: string;
}

export { TopupCardsMockProps, WalletNumberProp, CheckOutProp, CheckStatusProp };
