import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '@app/screens/auth/forgot-passcode/otp-verification.component';
import colors from '@app/styles/colors.const';
import { IdRenewalState } from '@app/utilities/enums.util';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { IPayButton } from '..';
import { useIdRenewal } from './ipay-id-renewal-sheet-helper';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';
import styles from './ipay-id-renewal-sheet.style';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { ConfirmIdRenewalProp, PrepareIdRenewalProp } from '@app/network/services/core/id-renewal/id-renewal.interface';
import { useTypedSelector } from '@app/store/store';
import { confirmRenewId, prepareRenewId } from '@app/network/services/core/id-renewal/id-renewal.service';
import icons from '@app/assets/icons';
import { useToastContext } from '../ipay-toast/context/ipay-toast-context';
import { CallbackProps } from '@app/screens/auth/forgot-passcode/forget-passcode.interface';

const IPayIdRenewalSheet = forwardRef<any, IPayIdRenewalSheetProps>(({ confirm }, ref) => {
  const idRenewalBottomSheet = useRef<any>();
  const helpBottomSheetRef = useRef<any>(); // Ref for the help bottom sheet
  const localizationText = useLocalization();
  const [idRenewalState, setIdRenewalState] = useState<IdRenewalState>(IdRenewalState.EXPIRE_FLAG_REACHED);
  const [renewId, setRenewId] = useState(false);
  const [otpRef, setOTPRef] = useState<string>('');
  const [isHelpBottomSheetVisible, setIsHelpBottomSheetVisible] = useState(false);
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { mobileNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [apiError, setAPIError] = useState<string>('');
  const { showToast } = useToastContext();

  const renderToast = (apiError: string) => {
    showToast({
      title: localizationText.api_request_failed,
      subTitle: apiError || localizationText.CARDS.VERIFY_CODE_ACCURACY,
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const handleSkip = () => {
    setRenewId(false);
  };

  const [customSnapPoints, setCustomSnapPoints] = useState<string[]>(['40%', '60%', '99%']); // Initial snap points

  const { title, subtitle, primaryButtonText, secondaryButtonText, icon, buttonIcon } = useIdRenewal(
    idRenewalState,
    colors,
  );

  useImperativeHandle(ref, () => ({
    present: () => {
      idRenewalBottomSheet.current?.present();
      setCustomSnapPoints(['40%', '70%']);
    },
    close: () => {
      idRenewalBottomSheet.current?.close();
    },
  }));

  const handleRenewalId = async () => {

    if (idRenewalState === IdRenewalState.EXPIRE_FLAG_REACHED) {
      try {
        const idRenewalPrepareBody = await getDeviceInfo();
        const payload: PrepareIdRenewalProp = {
          deviceInfo: idRenewalPrepareBody,
          walletNumber: walletNumber,
        };

        const apiResponse: any = await prepareRenewId(payload);
        
        if (apiResponse?.status?.type === 'SUCCESS') {
          setOTPRef(apiResponse?.response?.otpRef)
          setRenewId(true);
          setCustomSnapPoints(['98%', '99%']);
        } else if (apiResponse?.apiResponseNotOk) {
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
        } else {
          setAPIError(apiResponse?.error);
        }
      } catch (error: any) {
        setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
    } else {
      idRenewalBottomSheet.current?.present();
    }

    // if (idRenewalState === IdRenewalState.EXPIRE_FLAG_REACHED) {
    //   setRenewId(true);
    //   setCustomSnapPoints(['98%', '99%']);
    // } else {
    //   idRenewalBottomSheet.current?.present();
    // }
  };

  const onConfirm = () => {
    idRenewalBottomSheet.current?.close();
    confirm();
    handleSkip();
  };

  const getOtpData = async (info: CallbackProps) => {
    const DATA = info?.data
    const OTP_LENGHT = 4;
    if (DATA?.otp?.length == OTP_LENGHT)
      try {
        const idRenewalPrepareBody = await getDeviceInfo();
        const payload: ConfirmIdRenewalProp = {
          confirmBody: {
            otpRef: otpRef,
            otp: DATA?.otp?.length,
            mobileNumber: mobileNumber,
            deviceInfo: idRenewalPrepareBody
          },
          walletNumber: walletNumber,
        };

        const apiResponse: any = await confirmRenewId(payload);
        if (apiResponse?.status?.type === 'SUCCESS') {
          idRenewalBottomSheet.current?.close();
          confirm();
          handleSkip();
        } else if (apiResponse?.apiResponseNotOk) {
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
        } else {
          setAPIError(apiResponse?.error);
        }
      } catch (error: any) {
        setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
  };

  const handleOnPressHelp = () => {
    helpBottomSheetRef.current?.present(); // Close the main bottom sheet
    setIsHelpBottomSheetVisible(true); // Show the help bottom sheet
  };

  return (
    <>
      <IPayBottomSheet
        heading={localizationText.ID_RENEWAL.TITLE}
        onCloseBottomSheet={handleSkip}
        customSnapPoint={customSnapPoints}
        ref={idRenewalBottomSheet}
        simpleHeader
        simpleBar
        bold
        cancelBnt={renewId}
      >
        {renewId ? (
          <OtpVerificationComponent  onCallback={getOtpData} showVerify onPressHelp={handleOnPressHelp} />
        ) : (
          <IPayView style={styles.profileContainer}>
            {icon}
            <IPayTitle2Text style={styles.titleTextStyle}>{title}</IPayTitle2Text>
            <IPayCaption1Text style={styles.captionTextStyle}>{subtitle}</IPayCaption1Text>
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
      </IPayBottomSheet>

      {isHelpBottomSheetVisible && (
        <IPayBottomSheet
          heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
          onCloseBottomSheet={() => setIsHelpBottomSheetVisible(false)}
          customSnapPoint={['50%', '75%', '95%']}
          ref={helpBottomSheetRef}
          simpleHeader
          simpleBar
          cancelBnt
        >
          <HelpCenterComponent />
        </IPayBottomSheet>
      )}
    </>
  );
});

export default IPayIdRenewalSheet;
