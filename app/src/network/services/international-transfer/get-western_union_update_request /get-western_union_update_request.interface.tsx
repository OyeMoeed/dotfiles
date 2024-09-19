import { MockAPIStatusProps } from '../../services.interface';

export interface WUUpdateRequestResponse {
  status: MockAPIStatusProps;
  response: {
    updateRequestsList: {};
  };
  successfulResponse: true;
}
