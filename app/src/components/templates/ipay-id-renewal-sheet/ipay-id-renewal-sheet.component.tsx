import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { ConfirmIdRenewalProp, PrepareIdRenewalProp } from '@app/network/services/core/id-renewal/id-renewal.interface';
import { confirmRenewId, prepareRenewId } from '@app/network/services/core/id-renewal/id-renewal.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { IdRenewalState } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef, useState } from 'react';
import IPayRenewalIdAlert from './ipay-id-renewal-alert';
import { useIdRenewal } from './ipay-id-renewal-sheet.hook';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';
import styles from './ipay-id-renewal-sheet.style';

const IPayIdRenewalSheet: React.FC<Pick<IPayIdRenewalSheetProps, 'onClose' | 'visible'>> = ({ onClose, visible }) => {
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
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [renewalAlertVisible, setRenewalAlertVisible] = useState(false);

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');

  const renderToast = (apiErrorMessage: string) => {
    showToast({
      title: localizationText.ERROR.API_ERROR_RESPONSE,
      subTitle: apiErrorMessage || localizationText.CARDS.VERIFY_CODE_ACCURACY,
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const resetBottomSheet = () => {
    setCustomSnapPoints(['60%', '60%']);
    setRenewId(false);
    setIsHelpBottomSheetVisible(false);
  };

  const handleSkip = () => {
    resetBottomSheet();
    onClose();
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
      } catch (error: any) {
        setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
    }
  };

  const showSuccessAlert = () => {
    onClose();
    setRenewalAlertVisible(true);
  };

  const onCloseRenewalId = () => {
    setRenewalAlertVisible(false);
  };

  const getOtpData = async () => {
    const OTP_LENGHT = 4;
    setIsLoading(true);
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
        if (apiResponse?.status?.type === 'SUCCESS') {
          onClose();
          showSuccessAlert();
          handleSkip();
        } else if (apiResponse?.apiResponseNotOk) {
          setOtpError(true);
          otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
        } else {
          setOtpError(true);
          otpVerificationRef.current?.triggerToast(apiResponse?.error, false);
        }
      } catch (error: any) {
        setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
    }
    setIsLoading(false);
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      getOtpData();
    }
  };

  const handleOnPressHelp = () => {
    onClose(); // Close the main bottom sheet
    setIsHelpBottomSheetVisible(true); // Show the help bottom sheet
  };

  const onResendCodePress = () => {
    //Api Call or functionality
  };

  return (
    <>
      <IPayPortalBottomSheet
        heading={localizationText.ID_RENEWAL.TITLE}
        onCloseBottomSheet={handleSkip}
        customSnapPoint={customSnapPoints}
        isVisible={visible}
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
            isLoading={isLoading}
            apiError={apiError}
            isBottomSheet={false}
            handleOnPressHelp={handleOnPressHelp}
            onResendCodePress={onResendCodePress}
          />
        ) : (
          <IPayView style={styles.profileContainer}>
            {isAboutToExpire ? ID_ABOUT_EXPIRE.icon : icon}
            <IPayTitle2Text style={styles.titleTextStyle}>
              {isAboutToExpire ? ID_ABOUT_EXPIRE.title : title}
            </IPayTitle2Text>
            <IPayCaption1Text style={styles.captionTextStyle}>
              {isAboutToExpire
                ? ID_ABOUT_EXPIRE.subtitle
                    .replace('${DAYS}', remainingNumberOfDaysToExpire)
                    .replace('${DATE}', expiryDate)
                : subtitle}
            </IPayCaption1Text>
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
              onPress={handleSkip}
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

      {isHelpBottomSheetVisible && (
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
      )}
    </>
  );
};

export default IPayIdRenewalSheet;
