import { TransferRequestsResult } from '@app/network/services/transfers/wallet-to-wallet-transfer-confirm/wallet-to-wallet-transfer-confirm.interface';
import { SendMoneyType } from '@app/screens/transfer-summary/gift-transfer-summary/gift-transfer-summary.interface';

export interface IGiftTransferSuccessProps {
  transferDetails: {
    formData: SendMoneyType[];
    apiData: TransferRequestsResult[];
  };
  totalAmount: number;
}

export interface PayData {
  id: string;
  leftIcon: string;
  detailsText: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  isAlinma: boolean;
  index: number;
  transferPurpose?: string;
}
