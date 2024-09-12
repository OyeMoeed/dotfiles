import { MockAPIStatusProps } from '../../services.interface';

export interface ActivateBeneficiaryPayload {
  beneficiaryCode: string;
  activationMethod: ActivationMethods;
}

export enum ActivationMethods {
  IVR = 'IVR',
  VSGW = 'VSGW',
  ATM = 'ATM',
  SMSB = 'SMSB',
  CB = 'CB',
}

export interface ActivateBeneficiaryResponse {
  status: MockAPIStatusProps;
  response: {};
  successfulResponse: true;
}
