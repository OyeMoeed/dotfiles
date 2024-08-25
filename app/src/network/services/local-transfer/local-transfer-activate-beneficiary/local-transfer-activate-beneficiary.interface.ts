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
  status: {
    code: string;
    type: string;
    desc: string;
    sessionReference: string;
    requestReference: string;
  };
  response: {};
  successfulResponse: true;
}
