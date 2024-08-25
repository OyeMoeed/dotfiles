import { TransactionsProp } from './transaction/transaction.interface';

const CORE_URLS = {
  PREPARE_FORGET_PASSCODE: 'core-management/v1/user/forget-password/prepare',
  VALIDATE_OTP_FORGET_PASSCODE: 'core-management/v1/user/forget-password/validate-otp',
  CONFIRM_OTP_FORGET_PASSCODE: 'core-management/v1/user/forget-password/confirm',
  FORGET_PASSCODE: 'core/v1/user/forget-password/confirm',
  APP_CONFIGURATIONS: 'core/v1/appConfigurations',
  GET_WALLET_INFO: 'core/v1/wallet',
  GET_LOV: 'transfer-management/common/lov/inquiry',
  GET_CORE_LOV: 'transfer-management/common/lov/inquiry',
  SET_PASSCODE: 'core-management/v1/user/register',
  FAQ: 'core-management/v1/faq',
  GET_TRAFIC_VIOLATION: 'core/v1/moi/traffic-violations',
  GET_OFFERS: (walletNumber: string) => `core/v1/${walletNumber}/offers`,
  GET_TOP_UP_CARDS: (walletNumber: string) => `core/v1/${walletNumber}/topup-cards`,
  GET_TRANSACTIONS: (walletNumber: string) => `core/v1/${walletNumber}/transaction`,
  update_wallet: (walletNumber: string) => `core-management/v1/wallet/${walletNumber}/update`,
  CHANGE_PASSCODE: (walletNumber?: string) => `core-management/v1/user/${walletNumber}/change-password`,
  UPDATE_BIOMATRIC_STATUS: (walletNumber: string) => `core-management/v1/wallet/${walletNumber}/update`,
  APPLEPAY_TOP_UP: (walletNumber: string) => `core/v1/${walletNumber}/fees/applepay-topup`,
  GEOCODING: (latitude: string, longitude: string) =>
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=GOOGLE_MAPS_API_KEY`,
  GET_WALLET: (walletNumber: string) => `core-management/v1/wallet/${walletNumber}`,
  GET_HOME_TRANSACTIONS: (payload: TransactionsProp) =>
    `core-management/v1/${payload.walletNumber}/transaction?` +
    `max-records=${payload.maxRecords}&offset=${payload.offset}` +
    `${payload.cardIndex ? `&card-index=${payload.cardIndex}` : ''}` +
    `${payload.fromDate ? `&from-date=${payload.fromDate}` : ''}` +
    `${payload.toDate ? `&to-date=${payload.toDate}` : ''}` +
    `${payload.trxCategory ? `&trx-category=${payload.trxCategory}` : ''}` +
    `${payload.trxType ? `&trx-type=${payload.trxType}` : ''}` +
    `${payload.fromAmount ? `&from-amount=${payload.fromAmount}` : ''}` +
    `${payload.toAmount ? `&to-amount=${payload.toAmount}` : ''}` +
    `${payload.trxReqType ? `&trx-req-type=${payload.trxReqType}` : ''}`,

  GET_HOME_OFFERS: (
    walletNumber: string,
    offset?: number,
    maxRecords?: number,
    fromDate?: string,
    toDate?: string,
    id?: string,
    home?: boolean,
  ) => {
    const baseUrl = `core-management/v1/${walletNumber}/offers`;
    const params: { [key: string]: string | number | boolean | undefined } = {};

    if (offset !== undefined) params.offset = offset;
    if (maxRecords !== undefined) params['max-records'] = maxRecords;
    if (fromDate) params['from-date'] = fromDate;
    if (toDate) params['to-date'] = toDate;
    if (id) params.id = id;
    if (home !== undefined) params.home = home;

    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
      .join('&');

    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  },

  PREPARE_ID_RENEWAL: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/renewId/prepare`,
  CONFIRM_ID_RENEWAL: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/renewId/confirm`,
  DEVICE_DELINK: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/delink-device`,
  CHANGE_LANGUAGE: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/update`,
  GET_CARDS: (walletNumber?: string) => `cards-management/v1/${walletNumber}/cards`,
  GET_TRANSACTION_TYPES: `core-management/v1/transactionRequestTypes`,
  GET_TOPUP_CARDS: (walletNumber?: string) => `cards-management/v1/${walletNumber}/topup-cards`,
  TOPUP_CHECK_OUT: (walletNumber?: string) => `cards-management/v1/${walletNumber}/credit-topup/check-out`,
  CHECK_STATUS: (walletNumber?: string, refNumber?: string) => `cards-management/v1/${walletNumber}/credit-topup/${refNumber}/status`,
  GET_NAFATH_RANDOM: (channelId?: string) => `api/nafath-authentication/v1/iam/${channelId}/requests`,
  GET_NAFATH_INQUIRY: (channelId?: string, requestId?: string) => `api/nafath-authentication/v1/iam/${channelId}/requests/${requestId}`,
  UPDATE_WALLET_TIER: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/upgrade`
};


export default CORE_URLS;
