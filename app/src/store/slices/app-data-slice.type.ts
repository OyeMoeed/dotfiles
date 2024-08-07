import { DeviceInfoProps } from '@app/network/services/services.interface';

/**
 * Interface representing the initial state shape for app data.
 */
export interface AppDataInitialStateProps {
  appData: {
    transactionId?: string;
    deviceInfo: DeviceInfoProps;
    mobileNumber?: string;
    poi?: string;
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
