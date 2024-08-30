import { ApiError, MockAPIStatusProps } from '../../services.interface';

interface AlinmaExpressBanks {
  code: string;
  desc: string;
  branch: string;
  city: string;
  country: string;
}

interface Response {
  banks: AlinmaExpressBanks[];
}

interface AEBeneficiaryBanksProps {
  status: MockAPIStatusProps;
  response: Response;
  successfulResponse: boolean;
  ok: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

interface AEBeneficiaryBanksParam {
  alinmaExpressType: string;
  countryCode: string;
}

export { AEBeneficiaryBanksParam, AEBeneficiaryBanksProps, AlinmaExpressBanks };
