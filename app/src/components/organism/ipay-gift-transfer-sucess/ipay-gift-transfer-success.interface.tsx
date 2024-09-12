import { SendMoneyType } from '@app/screens/transfer-summary/gift-transfer-summary/gift-transfer-summary.interface';

interface IGiftTransferSuccessProps {
  transferDetails: {
    formData: SendMoneyType[];
  };
  totalAmount: number;
}

interface WalletPaymentDetails {
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

interface GiftDetails {
  isAlinma: boolean;
  value: string;
}

export { GiftDetails, IGiftTransferSuccessProps, WalletPaymentDetails };
