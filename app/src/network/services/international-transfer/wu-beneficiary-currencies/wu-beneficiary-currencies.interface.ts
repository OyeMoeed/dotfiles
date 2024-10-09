interface Currencies {
  code: string;
  desc: string;
  addtionalAttribute1: string;
}

interface WUCurrenciesResponseInterface {
  currencies: Currencies[];
}

interface BeneficiaryCurrenciesReq {
  countryCode?: string;
}

export { BeneficiaryCurrenciesReq, Currencies, WUCurrenciesResponseInterface };
