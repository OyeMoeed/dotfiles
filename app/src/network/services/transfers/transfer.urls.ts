const TRANSFERS_URLS = {
  GET_WALLET_TO_WALLET_TRANSFERS: (walletNumber: string) => `v1/w2w/${walletNumber}/friends/transfers`,
  GET_WALLET_DETAILS: (walletNumber: string) => `v1/wallet/${walletNumber}`,
};

export default TRANSFERS_URLS;
