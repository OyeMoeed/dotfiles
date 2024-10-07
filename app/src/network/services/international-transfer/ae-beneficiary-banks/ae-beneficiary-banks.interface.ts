interface AlinmaExpressBanks {
  code: string;
  desc: string;
  branch: string;
  city: string;
  country: string;
}

interface AEBanksResponseInterface {
  banks: AlinmaExpressBanks[];
}

interface AEBeneficiaryBanksParam {
  alinmaExpressType?: string;
  countryCode?: string;
}

export { AEBeneficiaryBanksParam, AlinmaExpressBanks, AEBanksResponseInterface };
