import { MockAPIStatusProps } from '../../services.interface';

export interface WURefundRequestResponse {
  status: MockAPIStatusProps;
  response: {
    refundRequestsList: {};
  };
  successfulResponse: true;
}
