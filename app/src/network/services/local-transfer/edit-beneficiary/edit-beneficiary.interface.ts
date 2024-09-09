import { MockAPIStatusProps } from '../../services.interface';

export interface editBeneficiaryPayload {
  nickname: string;
}

export interface editBeneficiaryResponse {
  status: MockAPIStatusProps;
  response: {};
  successfulResponse: true;
}
