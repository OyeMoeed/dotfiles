import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { ConfirmIdRenewalProp, PrepareIdRenewalProp } from '@app/network/services/core/id-renewal/id-renewal.interface';
import { confirmRenewId, prepareRenewId } from '@app/network/services/core/id-renewal/id-renewal.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { closeIdRenewalSheet } from '@app/store/slices/wallet-info-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { IdRenewalState, spinnerVariant } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import IPayRenewalIdAlert from './ipay-id-renewal-alert';
import { useIdRenewal } from './ipay-id-renewal-sheet.hook';
import styles from './ipay-id-renewal-sheet.style';

const IPayIdRenewalSheet: React.FC = () => {
  const localizationText = useLocalization();
  const idRenewalState: IdRenewalState = IdRenewalState.EXPIRE_FLAG_REACHED;
  const [renewId, setRenewId] = useState(false);
  const [otpRef, setOTPRef] = useState<string>('');
  const [isHelpBottomSheetVisible, setIsHelpBottomSheetVisible] = useState(false);
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { mobileNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { showToast } = useToastContext();
  const [customSnapPoints, setCustomSnapPoints] = useState<string[]>(['60%', '60%']); // Initial snap points
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const {
    aboutToExpire: isAboutToExpire,
    remainingNumberOfDaysToExpire,
    expiryDate,
    idExpired,
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [renewalAlertVisible, setRenewalAlertVisible] = useState(false);

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const { t } = useTranslation();
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const dispatch = useTypedDispatch();
  const isIdRenewalSheetVisible = useTypedSelector(
    (state) => state.walletInfoReducer.walletInfo.isIdRenewalSheetVisible,
  );

  const renderToast = (apiErrorMessage: string) => {
    showToast({
      title: localizationText.ERROR.API_ERROR_RESPONSE,
      subTitle: apiErrorMessage || localizationText.CARDS.VERIFY_CODE_ACCURACY,
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const resetBottomSheet = () => {
    setIsHelpBottomSheetVisible(false);
  };

  const renderSpinner = (isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  };

  const { title, subtitle, primaryButtonText, secondaryButtonText, icon, buttonIcon } = useIdRenewal(
    idRenewalState,
    colors,
  );

  const ID_ABOUT_EXPIRE = useIdRenewal(IdRenewalState.ABOUT_TO_EXPIRE, colors);

  const handleRenewalId = async () => {
    if (idRenewalState === IdRenewalState.EXPIRE_FLAG_REACHED) {
      try {
        const idRenewalPrepareBody = await getDeviceInfo();
        const payload: PrepareIdRenewalProp = {
          deviceInfo: idRenewalPrepareBody,
          walletNumber,
        };
        renderSpinner(true);
        const apiResponse: any = await prepareRenewId(payload);

        if (apiResponse?.status?.type === 'SUCCESS') {
          setOTPRef(apiResponse?.response?.otpRef);
          setRenewId(true);
          setCustomSnapPoints(['95%', '95%']);
        } else if (apiResponse?.apiResponseNotOk) {
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
        } else {
          setAPIError(apiResponse?.error);
        }
        renderSpinner(false);
      } catch (error: any) {
        renderSpinner(false);
        setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
    }
  };

  const closeOTPSheet = () => {
    if (renewId) {
      setCustomSnapPoints(['60%', '60%']);
      setRenewId(false);
    }
  };

  const closeBottomSheet = () => {
    closeOTPSheet();
    if (isIdRenewalSheetVisible) {
      dispatch(closeIdRenewalSheet());
    }
  };

  const showSuccessAlert = () => {
    closeBottomSheet();
    setRenewalAlertVisible(true);
  };

  const onCloseRenewalId = () => {
    setRenewalAlertVisible(false);
  };
  const handleRenewalIdResendOtp = async () => {
    try {
      const idRenewalPrepareBody = await getDeviceInfo();
      const payload: PrepareIdRenewalProp = {
        deviceInfo: idRenewalPrepareBody,
        walletNumber,
      };
      renderSpinner(true);
      const apiResponse: any = await prepareRenewId(payload);

      if (apiResponse?.status?.type === 'SUCCESS') {
        otpVerificationRef?.current?.resetInterval();
        setOTPRef(apiResponse?.response?.otpRef);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const getOtpData = async () => {
    const OTP_LENGHT = 4;
    renderSpinner(true);
    if (otp?.length === OTP_LENGHT) {
      try {
        const idRenewalPrepareBody = await getDeviceInfo();
        const payload: ConfirmIdRenewalProp = {
          confirmBody: {
            otpRef,
            otp,
            mobileNumber,
            deviceInfo: idRenewalPrepareBody,
          },
          walletNumber,
        };

        const apiResponse: any = await confirmRenewId(payload);
        renderSpinner(false);
        if (apiResponse?.status?.type === 'SUCCESS') {
          showSuccessAlert();
        } else if (apiResponse?.apiResponseNotOk) {
          setOtpError(true);
          otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE);
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
        } else {
          setOtpError(true);
          otpVerificationRef.current?.triggerToast(apiResponse?.error);
        }
      } catch (error: any) {
        renderSpinner(false);
        setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
    }
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE);
    } else {
      getOtpData();
    }
  };

  const handleOnPressHelp = () => {
    closeBottomSheet();
    setIsHelpBottomSheetVisible(true); // Show the help bottom sheet
  };

  const formattedSubtitle =
    isAboutToExpire && !idExpired
      ? t('ID_RENEWAL.ID_UPDATION_DES', {
          DAYS: remainingNumberOfDaysToExpire,
          DATE: moment(expiryDate, 'YYYY-MM-DD').format('DD-MM-YYYY'),
        })
      : subtitle;

  return (
    <>
      <IPayPortalBottomSheet
        heading={localizationText.ID_RENEWAL.TITLE}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={customSnapPoints}
        isVisible={isIdRenewalSheetVisible}
        simpleHeader
        simpleBar
        bold
        cancelBnt={renewId}
      >
        {renewId ? (
          <IPayOtpVerification
            ref={otpVerificationRef}
            onPressConfirm={onConfirmOtp}
            mobileNumber={mobileNumber as string}
            setOtp={setOtp}
            setOtpError={setOtpError}
            otpError={otpError}
            apiError={apiError}
            isBottomSheet={false}
            handleOnPressHelp={handleOnPressHelp}
            onResendCodePress={handleRenewalIdResendOtp}
          />
        ) : (
          <IPayView style={styles.profileContainer}>
            {isAboutToExpire && !idExpired ? ID_ABOUT_EXPIRE.icon : icon}
            <IPayTitle2Text style={styles.titleTextStyle}>
              {isAboutToExpire && !idExpired ? ID_ABOUT_EXPIRE.title : title}
            </IPayTitle2Text>
            <IPayCaption1Text style={styles.captionTextStyle}>{formattedSubtitle}</IPayCaption1Text>
            <IPayButton
              large
              onPress={handleRenewalId}
              btnStyle={styles.buttonStyle}
              btnType="primary"
              btnText={primaryButtonText}
              textColor={colors.natural.natural0}
              rightIcon={<IPayIcon icon={buttonIcon} size={20} color={colors.natural.natural0} />}
            />
            <IPayButton
              onPress={closeBottomSheet}
              btnStyle={styles.topStyles}
              btnType="link-button"
              btnText={secondaryButtonText}
              textStyle={styles.skipTextStyle}
              btnIconsDisabled
            />
          </IPayView>
        )}
      </IPayPortalBottomSheet>

      <IPayRenewalIdAlert visible={renewalAlertVisible} onClose={onCloseRenewalId} />

      <IPayPortalBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        onCloseBottomSheet={resetBottomSheet}
        customSnapPoint={['50%', '75%', '95%']}
        isVisible={isHelpBottomSheetVisible}
        simpleHeader
        simpleBar
        cancelBnt
      >
        <HelpCenterComponent />
      </IPayPortalBottomSheet>
    </>
  );
};

export default IPayIdRenewalSheet;
