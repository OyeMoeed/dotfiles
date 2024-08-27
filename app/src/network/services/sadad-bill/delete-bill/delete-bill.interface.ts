import { IDeveiceInfo } from '../../core/id-renewal/id-renewal.interface';

interface DeleteBillRequest {
  billNumOrBillingAcct: string;
  billId: string | number;
  billNickname: string;
  walletNumber: string;
  deviceInfo: IDeveiceInfo;
}
interface DeleteBillResponse {
  status: {
    code: string;
    type: string;
    desc: string;
    sessionReference: string;
    requestReference: string;
  };
  response: {
    billStatus: string;
  };
  successfulResponse: boolean;
}
export { DeleteBillRequest, DeleteBillResponse };
