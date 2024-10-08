interface AlinmaExpressBanks {
  code: string;
  desc: string;
  correspondantBank: string;
  actualRemittanceType: string;
  transferType: string;
}

interface AEBanksResponseInterface {
  banks: AlinmaExpressBanks[];
}

interface AEBeneficiaryBanksParam {
  alinmaExpressType?: string;
  countryCode?: string;
}

export { AEBeneficiaryBanksParam, AlinmaExpressBanks, AEBanksResponseInterface };
