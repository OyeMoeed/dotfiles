/**
 * Interface representing the initial state shape for app data.
 */
export interface AppDataInitialStateProps {
  appData: {
    transactionId?: string;
    deviceInfo?: object;
    encryptionData?: any;
    authorizationToken: string;
    isAuthenticated?: boolean;
    isLinkedDevice?: boolean;
    isFirstTime?: boolean;
    hideBalance?: boolean;
    biomatricEnabled?: boolean;
  };
}
