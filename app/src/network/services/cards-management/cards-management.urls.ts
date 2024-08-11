const CARDS_MANAGEMENT_URLS = {
  akthar_points: (walletNumber?: string) => `cards-management/v1/${walletNumber}/mazaya-topup/get-points`,
  redeem_points_prepare: (walletNumber?: string) =>
    `cards-management/v1/${walletNumber}/mazaya-topup/redeem-points/prepare`,
  redeem_points_confirm: (walletNumber?: string) =>
    `cards-management/v1/${walletNumber}/mazaya-topup/redeem-points/confirm`,
  transfer_to_wallet_fees: (walletNumber?: string) => `cards-management/v1/${walletNumber}/fees/wallet-to-wallet`,
};

export default CARDS_MANAGEMENT_URLS;
