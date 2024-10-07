const REGEX = {
  nationalID: /^(1|2)([0-9]{9})$/,
  saudiMobileNumber: /^(05)([0-9]{8})$/,
  longSaudiMobileNumber: /^(9665)([0-9]{8})$/,
  longSaudiMobileNumber2: /^(\+9665)([0-9]{8})$/,
  longSaudiMobileNumber3: /^(009665)([0-9]{8})$/,
  IBAN: /^SA[A-Za-z0-9_]{22}$/,
  DIGITS_ONLY: /^\d+$/,
  combinedSaudiMobileNumber: /^(05\d{8}|(?:\+?9665|009665|9665)\d{8})$/,
  name: /[^a-zA-Z\s]/g,
  withoutSpecialCharacters: "^[^$&+,،:;=?@#|'<>.^*()%!-]+$",
};
const STANDARD_MAX_LENGTH = 10;
const STANDARD_TEXT_INPUT_MAX_LENGTH = 256;

export { REGEX, STANDARD_MAX_LENGTH, STANDARD_TEXT_INPUT_MAX_LENGTH };
