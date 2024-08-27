const BILLS_URLS = {
  GET_BILLS: `v1/bills`,
  GET_BILLS_BY_STATUS: (walletNumber: string, billStatus: string) =>
    `v1/alinmapay/bills/${walletNumber}/?billStatus=${billStatus}`,
};

export default BILLS_URLS;
