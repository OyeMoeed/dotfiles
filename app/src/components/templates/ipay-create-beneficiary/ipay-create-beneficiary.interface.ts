interface ListOption {
  value: string;
  key: string;
}

interface FormValues {
  beneficiaryName: string;
  iban: string;
  bankName?: string;
  beneficiaryNickName?: string;
}
interface BeneficiaryBankDetails {
  bankCode: string;
  bankName: string;
  beneficiaryAccountNo: string;
}
interface BankDetails {
  code: string;
  desc: string;
}
enum TransferTypes {
  alinmaBank = 1,
  localBankInsideKsa = 2,
  international = 3,
  westernUnion = 4,
  alinmaExpress = 5,
}

interface IPayCreateBeneficiaryProps {
  testID?: string;
}

export { BankDetails, BeneficiaryBankDetails, FormValues, IPayCreateBeneficiaryProps, ListOption, TransferTypes };
