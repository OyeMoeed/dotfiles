// Import necessary interfaces
import { MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

// Define the Status interface
interface ProductDetailsStatus extends MockAPIStatusProps {
  code: string;
  type: 'SUCCESS' | 'FAILURE'; // Assuming it could be 'SUCCESS' or 'FAILURE'
  desc: string;
  sessionReference: string;
  requestReference: string;
}

// Define the Product interface
interface Product {
  desc: string;
  productId: string;
  imageUrl: string;
  merchant: string;
  merchantDesc: string;
  merchantIconUrl: string;
  priceCurrency: string;
  priceCurrencyDesc: string;
  priceCurrencyIconUrl: string;
  vatPercentage: number;
  priceBeforeVat: number;
  vat: number;
  priceAfterVat: number;
  howToUse: string;
}

// Define the Response interface
interface ProductDetailsResponse {
  products: Product[];
}

// Define the GetProductDetailsByProductIdMockProps interface that extends MockAPIOkProp with a specific response
interface GetProductDetailsByProductIdMockProps extends MockAPIOkProp {
  status: ProductDetailsStatus;
  response: ProductDetailsResponse;
  successfulResponse: boolean;
}

// Define the GetProductDetailsByProductIdPayloadProps interface for payload props
interface GetProductDetailsByProductIdPayloadProps {
  marchantId: string;
  productId: string;
  showLoader?: boolean;
}

// Export the interface
export {
  GetProductDetailsByProductIdMockProps,
  GetProductDetailsByProductIdPayloadProps,
  Product,
  ProductDetailsResponse,
};
