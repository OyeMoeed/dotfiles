/**
 * Interface representing the initial state shape for app data.
 */
export interface AppDataInitialStateProps {
  appData: {
    transactionId?: string;
    deviceInfo?: object;
    isAuthenticated?: boolean;
    isLinkedDevice?: boolean;
    isFirstTime?: boolean;
    hideBalance?: boolean;
  };
}
