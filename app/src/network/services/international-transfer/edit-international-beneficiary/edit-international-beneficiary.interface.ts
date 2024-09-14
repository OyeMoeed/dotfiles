import { MockAPIStatusProps } from '../../services.interface';

export interface editBeneficiaryPayload {
  beneficiaryCode: string;
  nickname?: string;
}

export interface editBeneficiaryResponse {
  status: MockAPIStatusProps;
  response: {};
  successfulResponse: true;
}
