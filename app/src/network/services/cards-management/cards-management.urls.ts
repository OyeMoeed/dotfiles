const CARDS_MANAGEMENT_URLS = {
  akthar_points: (walletNumber?: string) => `cards-management/v1/${walletNumber}/mazaya-topup/get-points`,
  redeem_points_prepare: (walletNumber?: string) =>
    `cards-management/v1/${walletNumber}/mazaya-topup/redeem-points/prepare`,
  redeem_points_confirm: (walletNumber?: string) =>
    `cards-management/v1/${walletNumber}/mazaya-topup/redeem-points/confirm`,
  applePayCheckOut: (walletNumber?: string) => `cards-management/v1/${walletNumber}/applepay-topup/check-out`,
  checkPaymentStatus: (walletNumber?: string, transactionRef?: string) =>
    `/v1/${walletNumber}/credit-topup/${transactionRef}/status`,
  transfer_to_wallet_fees: (walletNumber?: string) => `cards-management/v1/${walletNumber}/fees/wallet-to-wallet`,
  get_sarie_transfer_fees: (walletNumber: string) => `cards-management/v1/${walletNumber}/fees/sarie`,
  changeCardStatus: (walletNumber?: string) => `cards-management/v1/${walletNumber}/cards/status`,
  atm_withdrawal_fees: (walletNumber: string, amount: string) =>
    `cards-management/v1/${walletNumber}/fees/cash-withdraw?amount=${amount}`,
  atm_withdrawal_confirm: (walletNumber?: string) => `cards-management/v1/${walletNumber}/atm/withdraw`,
};

export default CARDS_MANAGEMENT_URLS;
