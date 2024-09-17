import { REGEX, STANDARD_MAX_LENGTH } from '@app/constants/app-validations';
import { LocalizationText } from '@app/localization/translations.localization';
import * as Yup from 'yup';

const getValidationSchemas = (localizationText: LocalizationText) => ({
  mobileNumberSchema: Yup.string()
    .required(localizationText.COMMON.INCORRECT_MOBILE_NUMBER)
    .matches(REGEX.saudiMobileNumber, localizationText.COMMON.INVALID_NUMBER),

  iqamaIdSchema: Yup.string()
    .required(localizationText.COMMON.INCORRECT_IQAMA)
    .matches(REGEX.nationalID, localizationText.COMMON.INCORRECT_IQAMA)
    .min(STANDARD_MAX_LENGTH, localizationText.COMMON.INCORRECT_IQAMA)
    .test('validateSAID', localizationText.COMMON.INCORRECT_IQAMA, () => true),

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

export default getValidationSchemas;
