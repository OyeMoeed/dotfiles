const REQUEST_MANAGEMENT_URLS = {
  getAllRequests: (walletNumber?: string) => `transfer-management/v1/${walletNumber}/money-requests`,
  create_money_request: (walletNumber: string) => `transfer-management/v1/${walletNumber}/money-request`,
};
export default REQUEST_MANAGEMENT_URLS;
