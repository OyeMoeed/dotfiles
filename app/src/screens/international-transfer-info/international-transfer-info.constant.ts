import { BeneficiariesDetails } from '@app/enums/international-beneficiary-status.enum';

const beneficiaryKeysMapping = {
  [BeneficiariesDetails.INFORMATIONS]: ['nickname', 'fullName', 'relationship', 'countryDesc', 'city'],
  [BeneficiariesDetails.DETAILS]: ['remittanceTypeDesc', 'iban', 'bankName', 'currency'],
  [BeneficiariesDetails.FEES]: [
    'remitterCurrencyAmount',
    'beneficiaryCurrencyAmount',
    'exchangeRate',
    'isIncludeFees',
    'vatAmount',
    'feeAmount',
  ],
};

export default beneficiaryKeysMapping;
