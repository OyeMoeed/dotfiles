const REQUEST_MANAGEMENT_URLS = {
  getAllRequests: (walletNumber?: string) => `transfer-management/v1/${walletNumber}/money-requests`,
  create_money_request: (walletNumber: string) => `transfer-management/v1/${walletNumber}/money-request`,
  recevied_request_prepare: (walletNumber: string, transactionId: string) =>
    `transfer-management/v1/${walletNumber}/money-requests/${{ transactionId }}/accept/prepare`,
  recevied_request_confirm: (walletNumber: string, transactionId: string) =>
    `transfer-management/v1/${walletNumber}/money-requests/${{ transactionId }}/accept/prepare`,
};
export default REQUEST_MANAGEMENT_URLS;
