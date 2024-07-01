// Define the WalletUpdateResponsePayloadProps interface
import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface PreferedLanguageProps {
  preferedLanguage: string;
}

interface WalletUpdateResponsePayloadProps extends DeviceInfoProps {
  walletNumber: string;
  userContactInfo: PreferedLanguageProps;
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

export { WalletUpdateMockProps, WalletUpdateResponsePayloadProps };
