import icons from '@app/assets/icons';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MoiPaymentDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}

// TODO will be replaced by API
const useMoiPaymentConfirmation = () => {
  const { t } = useTranslation();
  const otpRef = useRef<bottomSheetTypes>(null);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError] = useState<string>('');
  const [isLoading] = useState<boolean>(false);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);

  const moiPaymentDetailes: MoiPaymentDetail[] = [
    {
      id: '1',
      label: t('BILL_PAYMENTS.DUE_AMOUNT'),
      value: '500 SAR',
    },
    {
      id: '2',
      label: t('BILL_PAYMENTS.SERVICE_PROVIDER'),
      value: 'Expatriate Services',
    },
    {
      id: '3',
      label: t('BILL_PAYMENTS.SERVICE_TYPE'),
      value: 'Renewal of residence',
    },
    {
      id: '4',
      label: t('BILL_PAYMENTS.BENEFICIARY_ID'),
      value: '1965873233',
    },
    {
      id: '5',
      label: t('BILL_PAYMENTS.LICENSE_TYPE'),
      value: 'Expatriate Services',
    },
    {
      id: '6',
      label: t('BILL_PAYMENTS.DURATION'),
      value: 'Two years',
    },
  ];

  const moiPayBillSubList: MoiPaymentDetail[] = [
    {
      id: '1',
      label: t('BILL_PAYMENTS.BILL_TYPE'),
      value: 'Traffic Violation',
    },
    {
      id: '2',
      label: t('BILL_PAYMENTS.TRAFFIC_NUMBER'),
      value: '1965873233',
    },
    {
      id: '5',
      label: t('TRAFFIC_VIOLATION.VIOLATION_DATE'),
      value: '14/03/2023 - 15:30',
    },
    {
      id: '3',
      label: t('BILL_PAYMENTS.DUE_AMOUNT'),
      value: '500 SAR',
    },
    {
      id: '6',
      label: t('COMMON.REF_NUM'),
      value: 'FAT35346',
      icon: icons.copy,
    },
  ];

  const moiRefundBillSubList: MoiPaymentDetail[] = [
    {
      id: '1',
      label: t('BILL_PAYMENTS.DUE_AMOUNT'),
      value: '500 SAR',
    },
    {
      id: '2',
      label: t('BILL_PAYMENTS.SERVICE_PROVIDER'),
      value: 'Expatriate Services',
    },
    {
      id: '3',
      label: t('BILL_PAYMENTS.SERVICE_TYPE'),
      value: 'Renewal of residence',
    },
    {
      id: '4',
      label: t('BILL_PAYMENTS.VIOLATION_NUBMER'),
      value: '1965873233',
    },
    {
      id: '5',
      label: t('TRAFFIC_VIOLATION.VIOLATION_DATE'),
      value: '14/03/2023 - 15:30',
    },
    {
      id: '6',
      label: t('COMMON.REF_NUM'),
      value: 'FAT35346',
      icon: icons.copy,
    },
  ];

  const onConfirm = () => {
    otpRef?.current?.close();
    navigate(ScreenNames.MOI_PAYMENT_SUCCESS, {
      moiPaymentDetailes,
      successMessage: t('BILL_PAYMENTS.PAYMENT_SUCCESS_MESSAGE'),
      subDetails: moiPayBillSubList,
    });
  };

  const handlePay = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    } else {
      onConfirm();
    }
  };

  return {
    moiPaymentDetailes,
    moiRefundBillSubList,
    moiPayBillSubList,
    handlePay,
    setOtp,
    otp,
    isLoading,
    otpError,
    setOtpError,
    apiError,
    otpVerificationRef,
  };
};

export default useMoiPaymentConfirmation;
