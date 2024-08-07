const REGEX = {
  nationalID: /^(1|2)([0-9]{9})$/,
  SaudiMobileNumber: /^(05)([0-9]{8})$/,
  LongSaudiMobileNumber: /^(9665)([0-9]{8})$/,
  IBAN: /^(SA)([A-Za-z0-9]){22}$/,
  DIGITS_ONLY: /^\d+$/,
};
const STANDARD_MAX_LENGTH = 10;

export { REGEX, STANDARD_MAX_LENGTH };
