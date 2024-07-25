const CORE_URLS = {
  PREPARE_FORGET_PASSCODE: 'core/v1/user/forget-password/prepare',
  FORGET_PASSCODE: 'core/v1/user/forget-password/confirm',
  APP_CONFIGURATIONS: 'core/v1/appConfigurations',
  GET_WALLET_INFO: 'core/v1/wallet',
  GET_LOV: 'transfer-management/common/lov/inquiry',
  SET_PASSCODE: 'core-management/v1/user/register',
  FAQ: 'core-management/v1/faq',
  GET_OFFERS: (walletNumber: string) => `core/v1/${walletNumber}/offers`,
  GET_TOP_UP_CARDS: (walletNumber: string) => `core/v1/${walletNumber}/topup-cards`,
  GET_TRANSACTIONS: (walletNumber: string) => `core/v1/${walletNumber}/transaction`,
  update_wallet: (walletNumber: string) => `core-management/v1/wallet/${walletNumber}/update`,
  CHANGE_PASSCODE: (walletNumber: string) => `core/v1/user/${walletNumber}/change-password`,
  UPDATE_BIOMATRIC_STATUS: (walletNumber: string) => `core/v1/wallet/${walletNumber}/update`,
  APPLEPAY_TOP_UP: (walletNumber: string) => `core/v1/${walletNumber}/fees/applepay-topup`,
  GEOCODING: (latitude: string, longitude: string) =>
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=GOOGLE_MAPS_API_KEY`,
  GET_WALLET: (walletNumber: string) => `core-management/v1/wallet/${walletNumber}`,
  GET_HOME_TRANSACTIONS: (walletNumber: string, maxRecords: string, offset: string) => `core-management/v1/${walletNumber}/transaction?max-records=${maxRecords}&offset=${offset}`,
  GET_HOME_OFFERS: (walletNumber?: string, isHome?: string) => `core-management/v1/${walletNumber}/offers?home=${isHome}`,
  PREPARE_ID_RENEWAL: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/renewId/prepare`,
  CONFIRM_ID_RENEWAL: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/renewId/confirm`,
  DEVICE_DELINK: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/delink-device`,
  CHANGE_LANGUAGE: (walletNumber?: string) => `core-management/v1/wallet/${walletNumber}/update`,
};

export default CORE_URLS;
