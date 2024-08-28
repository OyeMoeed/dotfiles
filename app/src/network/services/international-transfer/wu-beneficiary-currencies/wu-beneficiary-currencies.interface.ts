import { ApiError } from '../../services.interface';

interface Status {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

interface Currencies {
  code: string;
  desc: string;
  addtionalAttribute1: string;
}

interface Response {
  currencies: Currencies[];
}

interface WUBeneficiaryCurrenciesProps {
  status: Status;
  response: Response;
  successfulResponse: boolean;
  ok: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

interface BeneficiaryCurrenciesReq {
  countryCode?: string;
}

export { BeneficiaryCurrenciesReq, Currencies, WUBeneficiaryCurrenciesProps };
