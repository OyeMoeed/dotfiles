import { MockAPIStatusProps } from "../../services.interface";

export interface wuRefundRequestResponse {
  status:MockAPIStatusProps;
  response: {
    refundRequestsList: {};
  };
  successfulResponse: true;
}
