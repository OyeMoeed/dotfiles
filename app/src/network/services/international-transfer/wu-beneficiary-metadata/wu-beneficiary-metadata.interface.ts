import { ApiError, MockAPIStatusProps } from '../../services.interface';

export interface WesternUnionCountries {
  code: string;
  desc: string;
  ibanRequired: boolean;
  acceptsBankName: boolean;
  phoneCode: string;
}

interface Response {
  westernUnionCountryList: WesternUnionCountries[];
}

interface WUBeneficiaryMetaDataProps {
  status: MockAPIStatusProps;
  response: Response;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

export default WUBeneficiaryMetaDataProps;
