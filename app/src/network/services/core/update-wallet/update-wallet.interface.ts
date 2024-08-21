// Define the IWalletUpdatePayload interface
import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface IUpdateWalletResponse {
  walletNumber: string;
  walletStatus: string;
  walletTier: string;
  availableBalance: string;
  currentBalance: string;
  dormant: boolean;
  idExpired: boolean;
}
interface IWalletUpdatePayload {
  incomeSource?: string;
  monthlyIncomeAmount?: string;
  workDetails?: WorkDetails;
  userContactInfo?: UserContactInfo;
  addressDetails?: AddressDetails;
  deviceInfo: DeviceInfoProps;
  profileImage: string;
}

interface AddressDetails {
  district?: string;
  street?: string;
  buildingNumber?: string;
  unitNumber?: string;
  additionalNumber?: string;
  poBox?: string;
}

interface UserContactInfo {
  city?: string;
  address?: string;
  postalCode?: string;
}

interface WorkDetails {
  occupation?: string;
  industry?: string;
}

// Define the WalletUpdateResponse interface
interface WalletUpdateResponse {
  dormant: boolean;
  currentBalance: string;
  walletStatus: string;
  idExpired: boolean;
  walletTier: string;
  walletNumber: string;
  availableBalance: string;
}

// Define the WalletUpdateDataProps interface that extends MockAPIDataProps with a specific response
interface WalletUpdateDataProps extends MockAPIDataProps {
  response: WalletUpdateResponse;
}

// Define the WalletUpdateMockProps interface that includes the data property
interface WalletUpdateMockProps extends MockAPIOkProp {
  data: WalletUpdateDataProps;
}

export { IUpdateWalletResponse, IWalletUpdatePayload, WalletUpdateDataProps, WalletUpdateMockProps };

