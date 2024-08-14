/**
 * Interface representing the initial state shape for app data.
 */
export interface AppDataInitialStateProps {
  appData: {
    otpTimeout: string | number;
    passCode: string;
    transactionId?: string;
    mobileNumber?: string;
    poiNumber?: string;
    deviceInfo?: object;
    encryptionData?: {
      passwordEncryptionPrefix: string;
      passwordEncryptionKey: string;
    };
    authorizationToken: string;
    isAuthenticated?: boolean;
    isLinkedDevice?: boolean;
    isFirstTime?: boolean;
    hideBalance?: boolean;
    biomatricEnabled?: boolean;
  };
}
