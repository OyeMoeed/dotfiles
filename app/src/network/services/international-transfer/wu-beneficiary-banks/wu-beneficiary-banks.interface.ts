interface WUBanks {
  code?: string;
  desc?: string;
  correspondantBank?: string;
  actualRemittanceType?: string;
  transferType?: string;
}

interface WUBanksResponseInterface {
  banks: WUBanks[];
}

interface WUBeneficiaryBanksParam {
  currency?: string;
  countryCode?: string;
}

export { WUBeneficiaryBanksParam, WUBanks, WUBanksResponseInterface };
