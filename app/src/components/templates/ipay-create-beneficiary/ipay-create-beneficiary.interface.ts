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

interface IPayCreateBeneficiaryProps {
  testID?: string;
}

export { BankDetails, BeneficiaryBankDetails, FormValues, IPayCreateBeneficiaryProps, ListOption };
