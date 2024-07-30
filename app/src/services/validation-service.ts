import { REGEX, STANDARD_MAX_LENGTH } from '@app/constants/app-validations';
import { LocalizationText } from '@app/localization/translations.localization';
import * as Yup from 'yup';

export const getValidationSchemas = (localizationText: LocalizationText) => ({
  mobileNumberSchema: Yup.string()
    .required(localizationText.COMMON.INCORRECT_MOBILE_NUMBER)
    .matches(REGEX.DIGITS_ONLY, localizationText.COMMON.INCORRECT_MOBILE_NUMBER)
    .min(STANDARD_MAX_LENGTH, localizationText.COMMON.INCORRECT_MOBILE_NUMBER),

  iqamaIdSchema: Yup.string()
    .required(localizationText.COMMON.INCORRECT_IQAMA)
    .matches(REGEX.DIGITS_ONLY, localizationText.COMMON.INCORRECT_IQAMA)
    .min(STANDARD_MAX_LENGTH, localizationText.COMMON.INCORRECT_IQAMA),

  city: Yup.string().required(localizationText.COMMON.REQUIRED_FIELD),
  companyName: Yup.string(),
  serviceType: Yup.string(),
  serviceProvider: Yup.string(),
  beneficiaryId: Yup.string().required(localizationText.BILL_PAYMENTS.INCORRECT_ID),
  idType: Yup.string(),
  duration: Yup.string(),
  myId: Yup.boolean(),
  myIdInput: Yup.string().required(localizationText.BILL_PAYMENTS.INCORRECT_ID),
});
