interface BeneficiaryInformation {
  recordID: string;
  serviceName: string;
  serviceLogo: string;
}
const BeneficiaryFields = {
  BENEFICIARY_NAME: 'beneficiaryName',
  IBAN: 'iban',
  BANK_NAME: 'bankName',
  RELATIONSHIP: 'relationship',
  CITY: 'city',
  ADDRESS: 'address',
  BENEFICIARY_NICK_NAME: 'beneficiaryNickName',
};

interface BeneficiaryTransferFormValues {
  beneficiaryName: string;
  iban: string;
  bankName: string;
  relationship: string;
  city: string;
  address: string;
  beneficiaryNickName?: string;
}

export { BeneficiaryFields, BeneficiaryInformation, BeneficiaryTransferFormValues };

