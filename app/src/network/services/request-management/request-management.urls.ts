import UpdateRequestTypes from './update-request.types';

const REQUEST_MANAGEMENT_URLS = {
  getAllRequests: (walletNumber?: string, mode?: string, offset?: number, maxRecord?: number) =>
    `transfer-management/v1/${walletNumber}/money-requests?mode=${mode}&offset=${offset}&max-records=${maxRecord}`,
  recevied_request_prepare: (walletNumber: string, transactionId: string) =>
    `transfer-management/v1/${walletNumber}/money-requests/${transactionId}/accept/prepare`,
  recevied_request_confirm: (walletNumber: string, transactionId: string) =>
    `transfer-management/v1/${walletNumber}/money-requests/${transactionId}/accept`,
  cancelRejectRequest: (walletNumber: string, transactionId: string, type: UpdateRequestTypes) =>
    `transfer-management/v1/${walletNumber}/money-requests/${transactionId}/manage?function=${type}`,
  create_money_request: (walletNumber: string) => `transfer-management/v1/${walletNumber}/money-request`,
};
export default REQUEST_MANAGEMENT_URLS;
