import { ApiError } from '../../services.interface';

interface Status {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

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
  status: Status;
  response: Response;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

export default WUBeneficiaryMetaDataProps;
