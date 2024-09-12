import { ApiError, MockAPIStatusProps } from '../../services.interface';

export interface WUTransferReason {
  code: string;
  desc: string;
  addtionalAttribute1: string;
}

interface DetailsMetaDataResponse {
  transferReasonList: WUTransferReason[];
}

interface WUBeneficiaryDetailsMetaDataProps {
  status: MockAPIStatusProps;
  response: DetailsMetaDataResponse;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
  error?: ApiError;
}

export default WUBeneficiaryDetailsMetaDataProps;
