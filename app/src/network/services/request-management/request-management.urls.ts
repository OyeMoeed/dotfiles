const REQUEST_MANAGEMENT_URLS = {
  getAllRequests: (walletNumber?: string) => `transfer-management/v1/${walletNumber}/money-requests`,
};
export default REQUEST_MANAGEMENT_URLS;
