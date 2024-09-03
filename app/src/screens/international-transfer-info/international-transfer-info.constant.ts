import { BeneficiariesDetails } from '@app/enums/international-beneficiary-status.enum';

const beneficiaryKeysMapping = {
  [BeneficiariesDetails.INFORMATIONS]: ['nickname', 'fullName', 'relationship', 'countryDesc', 'city'],
  [BeneficiariesDetails.DETAILS]: ['remittanceTypeDesc', 'iban', 'bankName', 'currency'],
};

export default beneficiaryKeysMapping;
