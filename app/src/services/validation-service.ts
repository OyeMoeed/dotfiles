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
    .min(STANDARD_MAX_LENGTH, localizationText.COMMON.INCORRECT_IQAMA),

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
    .max(50, localizationText.ERROR.TOO_LONG),
  billName: Yup.string().max(50, localizationText.ERROR.TOO_LONG),
});
