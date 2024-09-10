const TRANSFERS_URLS = {
  get_wallet_to_wallet_transfer: (walletNumber: string) =>
    `transfer-management/v1/w2w/${walletNumber}/friends/transfers`,
  wallet_to_wallet_transfer_prepare: (walletNumber: string) =>
    `transfer-management/v1/w2w/${walletNumber}/transfer/prepare`,
  wallet_to_wallet_transfer_confirm: (walletNumber: string) =>
    `transfer-management/v1/w2w/${walletNumber}/transfer/confirm`,
  wallet_to_wallet_check_active: (walletNumber: string) => `transfer-management/v1/w2w/${walletNumber}/friends`,
};

export default TRANSFERS_URLS;
