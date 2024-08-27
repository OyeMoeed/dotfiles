interface BeneficiaryDetails {
  title: string;
  subTitle: string;
  icon: string;
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
}
