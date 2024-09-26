// Import necessary interfaces
import { MockAPIDataProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber: string;
}

// Define the OfferItem interface
interface OfferItem {
  endDate: string | null;
  termsDetailsEn: string | null;
  imageUrlEn: string;
  termsDetailsAr: string | null;
  viewOrder: string | null;
  titleDetailsAr: string | null;
  titleEn: string | null;
  imageUrlAr: string;
  termsEn: string | null;
  id: string;
  titleDetailsEn: string | null;
  titleAr: string | null;
  termsAr: string | null;
  startDate: string | null;
}

// Define the OffersResponseDetails interface that extends MockAPIDataProps with a specific response
interface OffersResponseDetails extends MockAPIDataProps {
  response: {
    offers: OfferItem[]; // Define 'offers' here
  };
  paginationInfo: {
    matchedRecords: string;
    sentRecords: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}

// Extend the OffersMockProps interface from OffersResponseDetails and MockAPIOkProp
interface OffersMockProps extends MockAPIOkProp {
  response: OffersResponseDetails['response']; // Adjust to directly reference 'data' without nesting it again
  paginationInfo: OffersResponseDetails['paginationInfo']; // Include paginationInfo directly
  successfulResponse: OffersResponseDetails['successfulResponse']; // Include successfulResponse directly
  status: MockAPIStatusProps; // Include status directly
}

interface GetOffersPayload {
  walletNumber: string;
  offset?: number;
  maxRecords?: number;
  fromDate?: string;
  toDate?: string;
  id?: string;
  home?: boolean;
  hideLoader?: boolean;
}

export { GetOffersPayload, OffersMockProps, WalletNumberProp, OffersResponseDetails, OfferItem };
