export interface editBeneficiaryPayload {
  beneficiaryCode: string;
  nickname?: string;
}


export interface editBeneficiaryResponse {
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
