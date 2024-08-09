interface ListOption {
  value: string;
  key: string;
}

interface FormValues {
  beneficiary_name: string;
  iban: string;
  bankName: string;
  beneficiary_nick_name?: string;
}

interface IPayCreateBeneficiaryProps {
  testID?: string;
}

export { FormValues, IPayCreateBeneficiaryProps, ListOption };
