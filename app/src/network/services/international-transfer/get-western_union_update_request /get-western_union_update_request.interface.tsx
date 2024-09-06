import { MockAPIStatusProps } from "../../services.interface";

export interface wuUpdateRequestResponse {
  status:MockAPIStatusProps;
  response: {
    updateRequestsList: {};
  };
  successfulResponse: true;
}
