/**
 * Defines a set of constants.
 */
export const SLICE_NAMES = {
  ENCRYPTION_KEYS_SLICE: 'encryptionKeysSlice',
  THEME_SLICE: 'themeSlice',
  LANGUAGE_SLICE: 'languageSlice',
  RE_ARRANGE_SLICE: 'rearrangement',
  AUTH_SLICE: 'authSlice',
  APP_DATA_SLICE: 'appDataSlice',
  WALLET_INFO_SLICE: 'walletInfoSlice',
  CARDS_SLICE: 'cardsSlice',
  ALERT_SLICE: 'alertSlice',
  SPINNER_SLICE: 'spinnerSlice',
  DROPDOWN_SLICE: 'dropdownSlice',
  PERMISSION_ALERT_SLICE: 'permissionAlertSlice',
  RESET_STATE_SLICE: 'resetStateSlice',
  BOTTOM_SHEET_SLICE: 'bottomSheetSlice',
  FORCE_UPDATE_SLICE: 'forceUpdateSlice',
  RATING_SLICE: 'ratingSlice',
  DISABLED_MODULES: 'disabledModuleSlice',
  IDLE_TIMER: 'idleTimerModuleSlice',
};

export const WHITELISTED_DATA = [
  'appDataReducer',
  'languageReducer',
  'rearrangement',
  'walletInfoReducer',
  'ratingSlice',
];
