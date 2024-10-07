interface RemittanceType {
  code: string;
  desc: string;
  additionalAttribute1: string;
}

interface WuRemittanceTypesResponseInterface {
  remittanceTypes: RemittanceType[];
}

interface BeneficiaryCurrenciesReq {
  countryCode?: string;
  currencyCode?: string;
}

export { BeneficiaryCurrenciesReq, RemittanceType, WuRemittanceTypesResponseInterface };
