interface BeneficiaryDetails {
  title: string;
  subTitle: string;
  icon: string;
  currency?: string;
}

export interface BeneficiaryDetailsProps {
  item: BeneficiaryDetails;
}
