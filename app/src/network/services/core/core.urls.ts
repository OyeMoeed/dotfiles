const CORE_URLS = {
  PREPARE_FORGET_PASSCODE: 'core/v1/user/forget-password/prepare',
  FORGET_PASSCODE: 'core/v1/user/forget-password/confirm',
  DEVICE_DELINK: 'core/v1/wallet/10587981/delink-device',
  CHANGE_LANGUAGE: 'core/v1/wallet/10587981/update',
  APP_CONFIGURATIONS: 'core/v1/appConfigurations',
  GET_WALLET_INFO: 'core/v1/wallet',
  SET_PASSCODE: 'core-management/v1/user/register',
  GET_OFFERS: (walletNumber: string) => `core/v1/${walletNumber}/offers`,
  GET_TOP_UP_CARDS: (walletNumber: string) => `core/v1/${walletNumber}/topup-cards`,
  GET_TRANSACTIONS: (walletNumber: string) => `core/v1/${walletNumber}/transaction`,
  UPDATE_WALLET: (walletNumber: string) => `core/v1/wallet/${walletNumber}/update`,
  CHANGE_PASSCODE: (walletNumber: string) => `core/v1/user/${walletNumber}/change-password`,
  UPDATE_BIOMATRIC_STATUS: (walletNumber: string) => `core/v1/wallet/${walletNumber}/update`,
  APPLEPAY_TOP_UP: (walletNumber: string) => `core/v1/${walletNumber}/fees/applepay-topup`,
  GEOCODING: (latitude: string, longitude: string) =>
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=GOOGLE_MAPS_API_KEY`,
};

export default CORE_URLS;
