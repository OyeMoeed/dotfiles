import UpdateRequestTypes from './update-request.types';

const REQUEST_MANAGEMENT_URLS = {
  getAllRequests: (walletNumber?: string) => `transfer-management/v1/${walletNumber}/money-requests`,
  recevied_request_prepare: (walletNumber: string, transactionId: string) =>
    `transfer-management/v1/${walletNumber}/money-requests/${{ transactionId }}/accept/prepare`,
  recevied_request_confirm: (walletNumber: string, transactionId: string) =>
    `transfer-management/v1/${walletNumber}/money-requests/${{ transactionId }}/accept/prepare`,
  cancelRejectRequest: (walletNumber: string, transactionId: string, type: UpdateRequestTypes) =>
    `transfer-management/v1/${walletNumber}/money-requests/${transactionId}/manage?function=${type}`,
};
export default REQUEST_MANAGEMENT_URLS;
