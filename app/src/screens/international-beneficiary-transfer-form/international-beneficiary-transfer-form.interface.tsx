interface BeneficiaryInformation {
  recordID: string;
  serviceName: string;
  serviceLogo: string;
}
interface BeneficiaryTransferFormValues {
  beneficiary_name: string;
  iban: string;
  bankName: string;
  relationship: string;
  city: string;
  addres: string;
  beneficiary_nick_name?: string;
}

export { BeneficiaryInformation, BeneficiaryTransferFormValues };
