import { MockAPIStatusProps } from '../../services.interface';

interface Response {
  bankCode: string;
}

interface ValidateIBANResponseReq {
  iban: string;
  countryCode?: string;
}

interface ValidateIBANResponse {
  status: MockAPIStatusProps;
  response: Response;
  successfulResponse: boolean;
}
export { ValidateIBANResponse, ValidateIBANResponseReq };

