import { ReceivedRequestsResult } from '@app/network/services/transfers/wallet-to-wallet-transfer-confirm/wallet-to-wallet-transfer-confirm.interface';
import { SendMoneyFormType } from '@app/screens/send-money-form/send-money-form.interface';

export interface IW2WTransferSuccessProps {
  transferDetails: {
    formData: SendMoneyFormType[];
    apiData: ReceivedRequestsResult[];
  };
  totalAmount: number;
  variant: string;
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
}
