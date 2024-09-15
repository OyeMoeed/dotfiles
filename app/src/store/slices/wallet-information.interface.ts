import { GetWalletResponse } from '@app/network/services/core/get-wallet/get-wallet.interface';

/**
 * Interface representing the initial state shape for wallet information.
 */
export interface WalletInformationProps {
  walletInfo: GetWalletResponse;
  cashWithdrawalCardsList: string[];
}
