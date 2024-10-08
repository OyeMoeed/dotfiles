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
  CURRENCY: 'currency',
  ADDRESS: 'address',
  BENEFICIARY_NICK_NAME: 'beneficiaryNickName',
  WALLET_TYPE: 'walletType',
  FIRST_NAME: 'firstName',
  SECOND_NAME: 'secondName',
  THIRD_NAME: 'thirdName',
  LAST_NAME: 'lastName',
  BENEFICIARY_NATIONALITY: 'beneficiaryNationality',
  COUNTRY: 'country',
  REMITTANCE_TYPE: 'remittanceType',
};
enum TransferTypes {
  DIGITAL_WALLET = 'Digital Wallet',
  BANK = 'Bank Transfer',
  CASH = 'Cash Pickup',
}
enum TransferService {
  WESTERN_UNIION = 'Western Union',
  ALINMAPAY_DIRECT = 'AlinmaPay Direct',
}
interface BeneficiaryTransferFormValues {
  beneficiaryName: string;
  iban: string;
  bankName: string;
  remittanceType: string;
  city: string;
  beneficiaryNickName?: string;
  currency: string;
  country: string;
  beneficiaryCode: string;
}

export { BeneficiaryFields, BeneficiaryInformation, BeneficiaryTransferFormValues, TransferService, TransferTypes };
