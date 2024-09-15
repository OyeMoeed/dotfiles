import { CardType } from './issue-card-inquire/issue-card-inquire.interface';

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
  apple_pay_crypto: (walletNumber?: string) => `cards-management/v2/${walletNumber}/apple-pay-crypto`,
  GET_CARDS_TYPES: 'cards-management/v1/cardTypes',
  issue_card_inquire: (walletNumber: string, cardType: CardType) =>
    `cards-management/v1/${walletNumber}/cards/${cardType}/inquire`,
  issue_card_fees: (walletNumber: string, cardType: CardType, transactionType: string) =>
    `cards-management/v1/${walletNumber}/fees/card-issuance?cardType=${cardType}&transactionType=${transactionType}`,
  prepare_issue_card: (walletNumber: string) => `cards-management/v1/${walletNumber}/cards/card-transaction/prepare`,
  confirm_issue_card: (walletNumber: string) => `cards-management/v1/${walletNumber}/cards/card-transaction`,
};

export default CARDS_MANAGEMENT_URLS;
