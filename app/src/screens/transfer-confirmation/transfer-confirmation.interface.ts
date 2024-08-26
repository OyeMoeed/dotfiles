interface BeneficiaryDetails {
  title: string;
  subTitle: string;
  icon: string;
}

export interface BeneficiaryDetailsProps {
  item: BeneficiaryDetails;
}

export interface RouteParams {
  amount: string;
  beneficiaryNickName: string;
  transferPurpose: string;
  fastConversionBy: string;
  note: string;
  otpRef: string;
  feesAmount: string;
  vatAmount: string;
  totalAmount: string;
  authentication: {
    transactionId: string;
  };
}
