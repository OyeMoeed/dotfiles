import { REGEX, STANDARD_MAX_LENGTH } from '@app/constants/app-validations';
import { LocalizationText } from '@app/localization/translations.localization';
import * as Yup from 'yup';

export const getValidationSchemas = (localizationText: LocalizationText) => ({
  mobileNumberSchema: Yup.string()
    .required(localizationText.COMMON.INCORRECT_MOBILE_NUMBER)
    .matches(REGEX.SaudiMobileNumber, localizationText.COMMON.INCORRECT_MOBILE_NUMBER),

  iqamaIdSchema: Yup.string()
    .required(localizationText.FORGOT_PASSCODE.INCORRECT_NUMBER)
    .matches(REGEX.nationalID, localizationText.COMMON.INCORRECT_IQAMA)
    .min(STANDARD_MAX_LENGTH, localizationText.COMMON.INCORRECT_IQAMA)
    .test('validateSAID', localizationText.COMMON.INCORRECT_IQAMA, function (value) {
      // if (!value) return false;
      // return validateSAID(value) !== -1;
      return true;
    }),

  city: Yup.string().required(localizationText.COMMON.REQUIRED_FIELD),
  companyName: Yup.string(),
  serviceType: Yup.string(),
  serviceProvider: Yup.string(),
  beneficiaryId: Yup.string().required(localizationText.BILL_PAYMENTS.INCORRECT_ID),
  idType: Yup.string(),
  duration: Yup.string(),
  myIdCheck: Yup.boolean(),
  myId: Yup.string(),
  myIdInput: Yup.string().required(localizationText.BILL_PAYMENTS.INCORRECT_ID),
  accountNumber: Yup.string()
    .required(localizationText.ERROR.REQUIRED_VALIDATION_MESSAGE)
    .min(STANDARD_MAX_LENGTH, localizationText.ERROR.INCORRECT_ACCOUNT_NUMBER),
  billName: Yup.string().max(50, localizationText.ERROR.TOO_LONG),
  required: Yup.string().required(localizationText.COMMON.REQUIRED_FIELD),
  beneficiaryNameSchema: Yup.string()
    .required(localizationText.ERROR.REQUIRED_VALIDATION_MESSAGE)
    .max(50, localizationText.ERROR.TOO_LONG),
  ibanSchema: Yup.string()
    .matches(REGEX.IBAN, localizationText.ERROR.INVALID_IBAN)
    .required(localizationText.ERROR.REQUIRED_VALIDATION_MESSAGE),
  beneficiaryNickNameSchema: Yup.string().max(50, localizationText.ERROR.TOO_LONG),
  bankNameSchema: Yup.string(),
});

function validateSAID(id: string): number {
  const type = id[0];
  const _idLength = 10;
  const _type1 = '1';
  const _type2 = '2';
  let sum = 0;
  id = id.trim();
  if (isNaN(parseInt(id)) || id.length !== _idLength || (type !== _type2 && type !== _type1)) {
    return -1;
  }
  for (let num = 0; num < 10; num++) {
    const digit = Number(id[num]);
    if (num % 2 === 0) {
      const doubled = digit * 2;
      const ZFOdd = `00${doubled}`.slice(-2);
      sum += Number(ZFOdd[0]) + Number(ZFOdd[1]);
    } else {
      sum += digit;
    }
  }
  return sum % 10 !== 0 ? -1 : Number(type);
}
