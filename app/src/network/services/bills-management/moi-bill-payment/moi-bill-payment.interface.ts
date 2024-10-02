import { MockAPIStatusProps } from '../../services.interface';

interface MoiBillMockPayload {
  walletNumber: string;
}

interface BillPaymentResponseProps {
  payemntRefrenceInfo: string;
  totalAmount: string;
  refundId: string | null;
  refundState: string | null;
  refundRejectionReason: string | null;
  feeAmount: string | null;
  vatAmount: string | null;
  transactionId: string;
}

interface MoiBillResponse {
  response: BillPaymentResponseProps;
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}
export { BillPaymentResponseProps, MoiBillMockPayload, MoiBillResponse };
