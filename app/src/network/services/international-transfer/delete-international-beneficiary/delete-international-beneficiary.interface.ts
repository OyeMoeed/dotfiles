export interface Status {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

interface AlinmaExpressBeneficiariesProps {
  status: Status;
  response: {};
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
}

export default AlinmaExpressBeneficiariesProps;
