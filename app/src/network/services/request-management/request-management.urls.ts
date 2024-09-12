const REQUEST_MANAGEMENT_URLS = {
  getAllRequests: (walletNumber?: string, mode?: string, offset?: number, maxRecord?: number) =>
    `transfer-management/v1/${walletNumber}/money-requests?mode=${mode}&offset=${offset}&max-records=${maxRecord}`,
  recevied_request_prepare: (walletNumber: string, transactionId: string) =>
    `transfer-management/v1/${walletNumber}/money-requests/${transactionId}/accept/prepare`,
  recevied_request_confirm: (walletNumber: string, transactionId: string) =>
    `transfer-management/v1/${walletNumber}/money-requests/${transactionId}/accept`,
};
export default REQUEST_MANAGEMENT_URLS;
