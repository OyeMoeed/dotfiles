import { ApiError, MockAPIStatusProps } from '../../services.interface';

export interface AETypeList {
  code: string;
  desc: string;
}

export interface AEBeneficiaryMetaDataInterface {
  alinmaExpressTypeList: AETypeList[];
}

interface AEBeneficiaryMetaDataProps {
  status: MockAPIStatusProps;
  response: AEBeneficiaryMetaDataInterface;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

export default AEBeneficiaryMetaDataProps;
