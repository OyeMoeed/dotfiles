interface AlinmaExpressCurrencies {
  code: string;
  desc: string;
}

interface AECurrenciesInterface {
  currencies: AlinmaExpressCurrencies[];
}

interface AECurrenciesParams {
  alinmaExpressType?: string;
  bank?: string;
}

export { AECurrenciesParams, AECurrenciesInterface, AlinmaExpressCurrencies };
