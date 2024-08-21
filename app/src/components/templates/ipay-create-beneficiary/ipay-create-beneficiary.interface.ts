interface ListOption {
  value: string;
  key: string;
}

interface FormValues {
  beneficiaryName: string;
  iban: string;
  bankName: string;
  beneficiaryNickName?: string;
}

interface IPayCreateBeneficiaryProps {
  testID?: string;
}

export { FormValues, IPayCreateBeneficiaryProps, ListOption };
