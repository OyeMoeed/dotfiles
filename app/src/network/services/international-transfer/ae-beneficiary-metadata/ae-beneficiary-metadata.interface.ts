import { ApiError, MockAPIStatusProps } from '../../services.interface';

export interface AETypeList {
  code: string;
  desc: string;
}

interface Response {
  alinmaExpressTypeList: AETypeList[];
}

interface AEBeneficiaryMetaDataProps {
  status: MockAPIStatusProps;
  response: Response;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

export default AEBeneficiaryMetaDataProps;
