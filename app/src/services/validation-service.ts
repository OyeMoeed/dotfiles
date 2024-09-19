import { REGEX, STANDARD_MAX_LENGTH } from '@app/constants/app-validations';
import * as Yup from 'yup';

const getValidationSchemas = (t: any) => ({
  mobileNumberSchema: Yup.string()
    .required(t('COMMON.INCORRECT_MOBILE_NUMBER'))
    .matches(REGEX.saudiMobileNumber, t('COMMON.INVALID_NUMBER')),

  iqamaIdSchema: Yup.string()
    .required(t('COMMON.INCORRECT_IQAMA'))
    .matches(REGEX.nationalID, t('COMMON.INCORRECT_IQAMA'))
    .min(STANDARD_MAX_LENGTH, t('COMMON.INCORRECT_IQAMA'))
    .test('validateSAID', t('COMMON.INCORRECT_IQAMA'), () => true),

  city: Yup.string().required(t('COMMON.REQUIRED_FIELD')),
  companyName: Yup.string(),
  serviceType: Yup.string(),
  serviceProvider: Yup.string(),
  beneficiaryId: Yup.string().required(t('BILL_PAYMENTS.INCORRECT_ID')),
  idType: Yup.string(),
  duration: Yup.string(),
  myIdCheck: Yup.boolean(),
  myId: Yup.string(),
  myIdInput: Yup.string().required(t('BILL_PAYMENTS.INCORRECT_ID')),
  accountNumber: Yup.string()
    .required(t('ERROR.REQUIRED_VALIDATION_MESSAGE'))
    .min(STANDARD_MAX_LENGTH, t('ERROR.INCORRECT_ACCOUNT_NUMBER')),
  billName: Yup.string().max(50, t('ERROR.TOO_LONG')),
  required: Yup.string().required(t('COMMON.REQUIRED_FIELD')),
  beneficiaryNameSchema: Yup.string().required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')).max(50, t('ERROR.TOO_LONG')),
  ibanSchema: Yup.string()
    .matches(REGEX.IBAN, t('ERROR.INVALID_IBAN'))
    .required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')),
  beneficiaryNickNameSchema: Yup.string().max(50, t('ERROR.TOO_LONG')),
  bankNameSchema: Yup.string(),
});

export default getValidationSchemas;
