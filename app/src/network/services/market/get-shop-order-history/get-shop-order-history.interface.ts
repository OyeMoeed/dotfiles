// Import necessary interfaces
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the Status interface
interface ShopOrderHistoryStatus extends MockAPIStatusProps {
  code: string;
  type: 'SUCCESS' | 'FAILURE'; // Assuming it could be 'SUCCESS' or 'FAILURE'
  desc: string;
  sessionReference: string;
  requestReference: string;
}

// Define the PaginationInfo interface
interface PaginationInfo {
  matchedRecords: string;
  sentRecords: string;
}

// Define the PurchasedEvoucher interface
interface PurchasedEvoucher {
  squanceNumber: string;
  requestId: string;
  productId: string;
  merchantId: string;
  productNameAr: string;
  productNameEn: string;
  couponNumber: string;
  expiryDate: string | null;
  serialNumber: string;
  costPriceBeforeVat: number;
  costPriceVatAmount: number;
  costPriceIncludingVat: number;
  endUserPriceBeforeVAT: number;
  endUserPriceVATAmount: number;
  endUserPriceIncludingVAT: number;
  imageURL: string;
  issueDate: string; // ISO 8601 date format
}

// Define the Response interface
interface ShopOrderHistoryResponse {
  purchasedEvouchers: PurchasedEvoucher[];
}

// Define the GetShopOrderHistoryMockProps interface that extends MockAPIOkProp with a specific response
interface GetShopOrderHistoryMockProps extends MockAPIOkProp {
  status: ShopOrderHistoryStatus;
  paginationInfo: PaginationInfo;
  response: ShopOrderHistoryResponse;
  successfulResponse: boolean;
}

// Define the getShopOrderHistoryPayloadProps interface for payload props
interface getShopOrderHistoryPayloadProps {
  walletNumber: string;
  showLoader: boolean;
}

// Export the interface
export { GetShopOrderHistoryMockProps, getShopOrderHistoryPayloadProps, PurchasedEvoucher, ShopOrderHistoryResponse };
