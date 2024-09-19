import { TransferInfoData } from '@app/components/organism/ipay-transfer-information/ipay-transfer-information.interface';

interface BeneficiaryDetails {
  title: string;
  subTitle: string;
  icon: string;
  currency?: string;
}

export interface BeneficiaryDetailsProps {
  item: BeneficiaryDetails;
}

export interface TransactionDetails {
  amount: string;
  beneficiaryNickName: string;
  transferPurpose: string;
  instantTransferType: string;
  note: string;
  otpRef: string;
  feesAmount: string;
  vatAmount: string;
  totalAmount: string;
  authentication: {
    transactionId: string;
  };
  bankDetails?: TransferInfoData;
}
