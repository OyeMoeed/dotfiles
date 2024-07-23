import * as Yup from 'yup';
import constants from '@app/constants/constants';
import { LocalizationText } from '@app/localization/translations.localization';

export const getLocalizedValidationSchema = (localizationText: LocalizationText) =>
  Yup.object().shape({
    mobileNumber: Yup.string()
      .required(localizationText.COMMON.INCORRECT_MOBILE_NUMBER)
      .matches(/^\d+$/, localizationText.COMMON.INCORRECT_MOBILE_NUMBER)
      .min(constants.MOBILE_NUMBER_LENGTH, localizationText.COMMON.INCORRECT_MOBILE_NUMBER),
    iqamaId: Yup.string()
      .required(localizationText.COMMON.INCORRECT_IQAMA)
      .matches(/^\d+$/, localizationText.COMMON.INCORRECT_IQAMA)
      .min(constants.IQAMA_ID_NUMBER_LENGTH, localizationText.COMMON.INCORRECT_IQAMA),
  });
