import * as Yup from 'yup';
import constants, { REGEX } from '@app/constants/constants';
import { LocalizationText } from '@app/localization/translations.localization';

export const getValidationSchemas = (localizationText: LocalizationText) => ({
  mobileNumberSchema: Yup.string()
    .required(localizationText.COMMON.INCORRECT_MOBILE_NUMBER)
    .matches(/^\d+$/, localizationText.COMMON.INCORRECT_MOBILE_NUMBER)
    .min(constants.MOBILE_NUMBER_LENGTH, localizationText.COMMON.INCORRECT_MOBILE_NUMBER),

  iqamaIdSchema: Yup.string()
    .required(localizationText.COMMON.INCORRECT_IQAMA)
    .matches(/^\d+$/, localizationText.COMMON.INCORRECT_IQAMA)
    .min(constants.IQAMA_ID_NUMBER_LENGTH, localizationText.COMMON.INCORRECT_IQAMA),

//add all global validations here

})

