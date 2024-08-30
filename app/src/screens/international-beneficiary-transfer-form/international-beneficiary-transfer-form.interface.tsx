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
  WALLET_TYPE: 'walletType',
  FIRST_NAME: 'firstName',
  SECOND_NAME: 'secondName',
  THIRD_NAME: 'thirdName',
  LAST_NAME: 'lastName',
  BENEFICIARY_NATIONALITY: 'beneficiaryNationality',
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

enum DynamicFieldsKeys {
  'BEN.FRST.NAME' = 'firstName',
  'BEN.THIRD.NAME' = 'thirdName',
  'BEN.SECOND.NAME' = 'secondName',
  'BEN.LAST.NAME' = 'lastName',
  'BEN.NATIONALITY' = 'beneficiaryNationality',
  'BEN.RELATION' = 'relationship',
  'BEN.FULL.NAME' = 'beneficiaryName',
}

enum DynamicFieldsKeysSwapped {
  'firstName' = 'BEN.FRST.NAME',
  'thirdName' = 'BEN.THIRD.NAME',
  'secondName' = 'BEN.SECOND.NAME',
  'lastName' = 'BEN.LAST.NAME',
  'beneficiaryNationality' = 'BEN.NATIONALITY',
  'relationship' = 'BEN.RELATION',
  'beneficiaryName' = 'BEN.FULL.NAME',
}

interface BeneficiaryTransferFormValues {
  beneficiaryName: string;
  iban: string;
  bankName: string;
  relationship: string;
  city: string;
  address: string;
  beneficiaryNickName?: string;
  walletType: string;
  firstName: string;
  thirdName: string;
  secondName: string;
  lastName: string;
  beneficiaryNationality: string;
}

export {
  BeneficiaryFields,
  BeneficiaryInformation,
  BeneficiaryTransferFormValues,
  DynamicFieldsKeys,
  DynamicFieldsKeysSwapped,
  TransferService,
  TransferTypes,
};
