import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayFootnoteText, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification } from '@app/components/templates';
import { ConfirmIdRenewalProp, PrepareIdRenewalProp } from '@app/network/services/core/id-renewal/id-renewal.interface';
import { confirmRenewId, prepareRenewId } from '@app/network/services/core/id-renewal/id-renewal.service';
import { getDeviceInfo } from '@app/network/utilities';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { closeIdRenewalSheet } from '@app/store/slices/wallet-info-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { buttonVariants, IdRenewalState } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IPayRenewalIdAlert from './ipay-id-renewal-alert';
import { useIdRenewal } from './ipay-id-renewal-sheet.hook';
import styles from './ipay-id-renewal-sheet.style';

const IPayIdRenewalSheet: React.FC = () => {
  const { t } = useTranslation();
  const idRenewalState: IdRenewalState = IdRenewalState.EXPIRE_FLAG_REACHED;
  const [renewId, setRenewId] = useState(false);
  const [otpRef, setOTPRef] = useState<string>('');
  const [isHelpBottomSheetVisible, setIsHelpBottomSheetVisible] = useState(false);
  const [customSnapPoints, setCustomSnapPoints] = useState<string[]>(['60%', '60%']); // Initial snap points
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const {
    aboutToExpire: isAboutToExpire,
    remainingNumberOfDaysToExpire,
    expiryDate,
    idExpired,
    walletNumber,
    mobileNumber,
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [renewalAlertVisible, setRenewalAlertVisible] = useState(false);

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  const isIdRenewalSheetVisible = useTypedSelector(
    (state) => state.walletInfoReducer.walletInfo.isIdRenewalSheetVisible,
  );

  const resetBottomSheet = () => {
    setIsHelpBottomSheetVisible(false);
  };

  const { title, subtitle, primaryButtonText, secondaryButtonText, icon, buttonIcon } = useIdRenewal(
    idRenewalState,
    colors,
  );

  const ID_ABOUT_EXPIRE = useIdRenewal(IdRenewalState.ABOUT_TO_EXPIRE, colors);

  const handleRenewalId = async () => {
    if (idRenewalState === IdRenewalState.EXPIRE_FLAG_REACHED) {
      const idRenewalPrepareBody = await getDeviceInfo();
      const payload: PrepareIdRenewalProp = {
        deviceInfo: idRenewalPrepareBody,
        walletNumber,
      };
      const apiResponse: any = await prepareRenewId(payload);

      if (apiResponse) {
        setOTPRef(apiResponse?.response?.otpRef);
        setRenewId(true);
        setCustomSnapPoints(['99%', '99%']);
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
    const idRenewalPrepareBody = await getDeviceInfo();
    const payload: PrepareIdRenewalProp = {
      deviceInfo: idRenewalPrepareBody,
      walletNumber,
    };
    const apiResponse: any = await prepareRenewId(payload);

    if (apiResponse?.status?.type === 'SUCCESS') {
      otpVerificationRef?.current?.resetInterval();
      setOTPRef(apiResponse?.response?.otpRef);
    }
  };

  const getOtpData = async () => {
    const OTP_LENGHT = 4;
    if (otp?.length === OTP_LENGHT) {
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
      if (apiResponse?.status?.type === 'SUCCESS') {
        showSuccessAlert();
      }
    }
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'));
    } else {
      getOtpData();
    }
  };

  const handleOnPressHelp = () => {
    closeBottomSheet();
    setIsHelpBottomSheetVisible(true); // Show the help bottom sheet
  };

  useEffect(() => {
    if (isIdRenewalSheetVisible && renewId) {
      setOtp('');
    }
  }, [isIdRenewalSheetVisible, renewId]);

  const extraParams = {
    DAYS: remainingNumberOfDaysToExpire,
    DATE: moment(expiryDate, 'YYYY-MM-DD').format('DD-MM-YYYY'),
  };
  const formattedSubtitle = isAboutToExpire && !idExpired ? t('ID_RENEWAL.ID_UPDATION_DES', extraParams) : subtitle;

  // TODO: fix nested-components
  // eslint-disable-next-line react/no-unstable-nested-components
  const DisclaimerSection = () => (
    <IPayView style={styles.verifyView}>
      <IPayView style={styles.verifyViewRow}>
        <IPayIcon icon={icons.info_circle} color={colors.primary.primary900} />
        <IPayFootnoteText
          regular
          style={styles.verifyText}
          color={colors.primary.primary800}
          text="ID_RENEWAL.WHY_VERIFY_TITLE"
        />
      </IPayView>

      <IPayCaption1Text
        regular
        style={styles.verifyText}
        color={colors.natural.natural700}
        text="ID_RENEWAL.WHY_VERIFY"
      />
    </IPayView>
  );

  return (
    <>
      <IPayPortalBottomSheet
        heading="ID_RENEWAL.TITLE"
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={customSnapPoints}
        isVisible={isIdRenewalSheetVisible}
        simpleHeader
        simpleBar
        bold
        onCancel={closeOTPSheet}
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
            otp={otp}
            isBottomSheet={false}
            handleOnPressHelp={handleOnPressHelp}
            onResendCodePress={handleRenewalIdResendOtp}
            hasDisclaimerSection
            disclaimerSection={<DisclaimerSection />}
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
              btnType={buttonVariants.PRIMARY}
              btnText={isAboutToExpire && !idExpired ? ID_ABOUT_EXPIRE.primaryButtonText : primaryButtonText}
              textColor={colors.natural.natural0}
              rightIcon={
                <IPayIcon
                  icon={isAboutToExpire && !idExpired ? ID_ABOUT_EXPIRE.buttonIcon : buttonIcon}
                  size={20}
                  color={colors.natural.natural0}
                />
              }
            />
            <IPayButton
              onPress={closeBottomSheet}
              btnStyle={styles.topStyles}
              btnType={buttonVariants.LINK_BUTTON}
              btnText={isAboutToExpire && !idExpired ? ID_ABOUT_EXPIRE.secondaryButtonText : secondaryButtonText}
              textStyle={styles.skipTextStyle}
              btnIconsDisabled
            />
          </IPayView>
        )}
      </IPayPortalBottomSheet>

      <IPayRenewalIdAlert visible={renewalAlertVisible} onClose={onCloseRenewalId} />

      <IPayPortalBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
        onCloseBottomSheet={resetBottomSheet}
        customSnapPoint={['50%', '75%', '95%']}
        isVisible={isHelpBottomSheetVisible}
        simpleHeader
        simpleBar
        cancelBnt
      >
        <HelpCenterComponent hideFAQError />
      </IPayPortalBottomSheet>
    </>
  );
};

export default IPayIdRenewalSheet;
