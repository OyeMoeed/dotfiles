import { ApiError, MockAPIStatusProps } from '../../services.interface';

interface AlinmaExpressCountries {
  code: string;
  desc: string;
}

interface Response {
  countries: AlinmaExpressCountries[];
}

interface AEBeneficiaryCountriesProps {
  status: MockAPIStatusProps;
  response: Response;
  successfulResponse: boolean;
  ok: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

interface AEBeneficiaryCountriesParam {
  alinmaExpressType?: string;
}

export { AEBeneficiaryCountriesParam, AEBeneficiaryCountriesProps, AlinmaExpressCountries };
