import { MockAPIStatusProps } from '../../services.interface';

interface MoiBillMockPayload {
  walletNumber: string;
}

interface MoiBillResponse {
  response: {
    payemntRefrenceInfo: string;
    totalAmount: string;
    refundId: string | null;
    refundState: string | null;
    refundRejectionReason: string | null;
    feeAmount: string | null;
    vatAmount: string | null;
    transactionId: string;
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}
export { MoiBillMockPayload, MoiBillResponse };
