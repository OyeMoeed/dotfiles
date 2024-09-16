import { MockAPIStatusProps } from '../../services.interface';

interface PrepareMoiBillPayload {
  walletNumber: string;
}

interface PrepareMoiBillResponse {
  response: {
    otpRef: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}
export { PrepareMoiBillPayload, PrepareMoiBillResponse };

