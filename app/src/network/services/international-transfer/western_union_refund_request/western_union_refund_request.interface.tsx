export interface wuRefundRequestResponse {
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
