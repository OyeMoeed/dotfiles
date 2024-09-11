import { MockAPIStatusProps } from '../../services.interface';

export interface EditBeneficiaryPayload {
  nickname: string;
}

export interface EditBeneficiaryResponse {
  status: MockAPIStatusProps;
  response: {};
  successfulResponse: true;
}
