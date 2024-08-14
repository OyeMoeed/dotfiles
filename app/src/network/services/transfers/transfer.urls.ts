const TRANSFERS_URLS = {
  GET_WALLET_TO_WALLET_TRANSFERS: (walletNumber: string) => `v1/w2w/${walletNumber}/friends/transfers`,
  wallet_to_wallet_transfer_prepare: (walletNumber: string) =>
    `transfer-management/v1/w2w/${walletNumber}/transfer/prepare`,
  wallet_to_wallet_transfer_confirm: (walletNumber: string) =>
    `transfer-management/v1/w2w/${walletNumber}/transfer/confirm`,
};

export default TRANSFERS_URLS;
