const AUTHENTICATION_URLS = {
  PREPARE_LOGIN: 'authentication/v1/login/prepare',
  LOGIN: 'authentication/v1/login',
  OTP_VERIFICATION: 'authentication/v1/login/otp',
  LOGIN_VIA_PASSCODE: 'authentication/v1/login',
  LOGOUT: () => `authentication/v1/alinmapay/logout`,
};

export default AUTHENTICATION_URLS;
