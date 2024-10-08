import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { InternationalTransferValue } from '../international-beneficiary-transfer-form/international-beneficiary-transfer-form.interface';

const useAddInternationalBenValidation = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    transferType: Yup.string()
      .typeError(t('ERROR.INVALID_TEXT'))
      .oneOf([InternationalTransferValue.AE, InternationalTransferValue.WU])
      .required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')),
    currency: Yup.string().typeError(t('ERROR.INVALID_TEXT')).required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')),
    country: Yup.string().typeError(t('ERROR.INVALID_TEXT')).required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')),
    remittanceType: Yup.string()
      .typeError(t('ERROR.INVALID_TEXT'))
      .when('transferType', {
        is: (val: string) => val === InternationalTransferValue.WU,
        then: () => Yup.string().typeError(t('ERROR.INVALID_TEXT')).required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')),
        otherwise: () => Yup.string().notRequired(),
      }),
    nickname: Yup.string()
      .required(t('ERROR.REQUIRED_VALIDATION_MESSAGE'))
      .typeError(t('ERROR.INVALID_TEXT'))
      .max(50, t('VALIDATION.MAX_WIDTH', { label: t('TRANSACTION_HISTORY.BENEFICIARY_NICK_NAME'), max: 50 })),
    deliveryType: Yup.string()
      .typeError(t('ERROR.INVALID_TEXT'))
      .when('transferType', {
        is: (val: string) => val === InternationalTransferValue.AE,
        then: () => Yup.string().typeError(t('ERROR.INVALID_TEXT')).required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')),
        otherwise: () => Yup.string().notRequired(),
      }),
    bank: Yup.string()
      .typeError(t('ERROR.INVALID_TEXT'))
      .when('transferType', {
        is: (val: string) => val === InternationalTransferValue.AE,
        then: () => Yup.object().required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')),
        otherwise: () =>
          Yup.string()
            .typeError(t('ERROR.INVALID_TEXT'))
            .when('remittanceType', {
              is: (val: string) => val === '500',
              then: () =>
                Yup.string().typeError(t('ERROR.INVALID_TEXT')).required(t('ERROR.REQUIRED_VALIDATION_MESSAGE')),
              otherwise: () => Yup.string().notRequired(),
            }),
      }),
  });

  return {
    validationSchema,
  };
};

export default useAddInternationalBenValidation;
