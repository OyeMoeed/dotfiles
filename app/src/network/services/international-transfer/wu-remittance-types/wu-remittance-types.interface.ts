import { MockAPIStatusProps } from '../../services.interface';

interface RemittanceType {
  code: string;
  desc: string;
  additionalAttribute1: string;
}

interface Response {
  remittanceTypes: RemittanceType[];
}

interface WuRemittanceTypesProps {
  status: MockAPIStatusProps;
  response: Response;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
}
interface BeneficiaryCurrenciesReq {
  countryCode?: string;
  currencyCode?: string;
}

export { BeneficiaryCurrenciesReq, RemittanceType, WuRemittanceTypesProps };
