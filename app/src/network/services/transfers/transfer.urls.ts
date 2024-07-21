const TRANSFERS_URLS = {
  GET_WALLET_TO_WALLET_TRANSFERS: (walletNumber: string) => `v1/w2w/${walletNumber}/friends/transfers`,
};

export default TRANSFERS_URLS;
