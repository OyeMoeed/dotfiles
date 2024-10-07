export interface WesternUnionCountries {
  code: string;
  desc: string;
  ibanRequired: boolean;
  acceptsBankName: boolean;
  phoneCode: string;
}

interface WUBeneficiaryMetaDataResponseInterface {
  westernUnionCountryList: WesternUnionCountries[];
}

export default WUBeneficiaryMetaDataResponseInterface;
