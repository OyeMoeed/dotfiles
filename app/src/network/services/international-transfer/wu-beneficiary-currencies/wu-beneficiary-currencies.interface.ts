import { ApiError, MockAPIStatusProps } from '../../services.interface';

interface Currencies {
  code: string;
  desc: string;
  addtionalAttribute1: string;
}

interface Response {
  currencies: Currencies[];
}

interface WUBeneficiaryCurrenciesProps {
  status: MockAPIStatusProps;
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
