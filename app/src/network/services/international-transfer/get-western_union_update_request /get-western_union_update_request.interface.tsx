export interface wuUpdateRequestResponse {
  status: {
    code: string;
    type: string;
    desc: string;
    sessionReference: string;
    requestReference: string;
  };
  response: {
    updateRequestsList: {};
  };
  successfulResponse: true;
}
