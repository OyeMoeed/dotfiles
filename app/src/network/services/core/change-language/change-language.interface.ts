import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface changeLanguageApiResponse {
  statusCode?: string;
  data?: object;
}

type userContactInfo = {
  preferedLanguage: string;
};

interface changeLanguagePayloadProps {
  userContactInfo: userContactInfo;
  deviceInfo: DeviceInfoProps;
}

// Define the ChangeLanguageResponseDetails interface
interface ChangeLanguageResponseDetails {
  walletNumber: string;
  walletStatus: string;
  walletTier: string;
  availableBalance: string;
  currentBalance: string;
  dormant: boolean;
  idExpired: boolean;
}

// Define the ChangeLanguageDataProps interface that extends MockAPIDataProps with a specific response
interface ChangeLanguageDataProps extends MockAPIDataProps {
  response: ChangeLanguageResponseDetails;
}

// Extend the ChangeLanguageMockProps interface from ChangeLanguageDataProps and MockAPIOkProp
interface ChangeLanguageMockProps extends MockAPIOkProp {
  data: ChangeLanguageDataProps;
}

export { ChangeLanguageMockProps, changeLanguageApiResponse, changeLanguagePayloadProps, userContactInfo };
