interface AlinmaExpressCountries {
  code: string;
  desc: string;
}

interface AECountriesResponseInterface {
  countries: AlinmaExpressCountries[];
}

interface AEBeneficiaryCountriesParam {
  alinmaExpressType?: string;
}

export { AEBeneficiaryCountriesParam, AECountriesResponseInterface, AlinmaExpressCountries };
