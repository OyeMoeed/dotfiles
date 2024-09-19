import { IPayFootnoteText, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import IPayPointRedemptionCard from '@app/components/atoms/ipay-point-redemption-card/ipay-point-redemption-card.component';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  IRedeemPointsConfirmReq,
  IRedeemPointsConfirmRes,
} from '@app/network/services/cards-management/mazaya-topup/redeem-points-confirm/redeem-points-confirm.interface';
import redeemPointsConfirm from '@app/network/services/cards-management/mazaya-topup/redeem-points-confirm/redeem-points-confirm.service';
import redeemPointsPrepare from '@app/network/services/cards-management/mazaya-topup/redeem-points-prepare/redeem-points-prepare.service';
import { getDeviceInfo } from '@app/network/utilities';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, TopupStatus } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import IPayPortalBottomSheet from '../ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayPointRedemptionConfirmatonProps } from './ipay-points-redemption-confirmation.interface';
import pointRedemptionConfirmation from './ipay-points-redemption-confirmation.style';

const IPayPointsRedemptionConfirmation: FC<IPayPointRedemptionConfirmatonProps> = ({ testID, params }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const pointRemdemptionBottomSheetRef = useRef<bottomSheetTypes>(null);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const styles = pointRedemptionConfirmation(colors);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const { otpConfig } = useConstantData();

  const onConfirm = async (showOtpPopup: boolean = true) => {
    const apiResponse = await redeemPointsPrepare(walletInfo.walletNumber, {
      deviceInfo: await getDeviceInfo(),
    });
    if (apiResponse?.status.type === 'SUCCESS') {
      if (showOtpPopup) {
        setOtpSheetVisible(true);
      }
    }
    otpVerificationRef?.current?.resetInterval();
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    pointRemdemptionBottomSheetRef?.current?.close();
    setOtpSheetVisible(false);
  };

  const getRemainPoints = (): number => params.totalpoints - params.redeemPoints;

  const onConfirmOtpVerification = (data: IRedeemPointsConfirmRes) => {
    navigate(ScreenNames.POINTS_REDEMPTIONS_SUCCESS_AND_FAILED, {
      redeemPoints: data.redeemPoints,
      redeemAmount: data.redeemAmount,
      date: data.date,
      referenceNumber: data.referenceNumber,
      topupStatus: data.topupStatus,
    });
    setOtpSheetVisible(false);
  };

  const verifyOtp = async () => {
    const payload: IRedeemPointsConfirmReq = {
      deviceInfo: await getDeviceInfo(),
      otp,
      redeemPoints: Number(params.redeemPoints),
      redeemAmount: Number(params.redeemAmount),
    };

    const apiResponse = await redeemPointsConfirm(walletInfo.walletNumber, payload);

    if (apiResponse?.status?.type === 'SUCCESS') {
      if (apiResponse?.response) {
        onConfirmOtpVerification({ ...apiResponse?.response, topupStatus: TopupStatus.SUCCESS });
      }
    } else if (apiResponse?.status?.code === 'E002961') {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'));
    } else {
      onConfirmOtpVerification({
        ...apiResponse?.response,
        topupStatus: TopupStatus.FAILED,
      } as IRedeemPointsConfirmRes);
    }
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'));
    } else {
      verifyOtp();
    }
  };

  const onResendCodePress = () => {
    onConfirm(false);
  };

  useEffect(() => {
    if (isOtpSheetVisible) {
      setOtp('');
    }
  }, [isOtpSheetVisible]);

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPaySafeAreaView style={styles.container}>
        <IPayHeader title="TOP_UP.REDEEM_POINTS" backBtn applyFlex />

        <IPayView style={styles.redemptionConfirmDetail}>
          <IPayPointRedemptionCard
            containerStyle={styles.redemptionCardStyle}
            backgroundImageStyle={styles.redemptionCardBackgroundImage}
            innerContainerStyle={styles.redemptionInnerCardStyle}
            headerStyle={styles.redemptionHeaderStyle}
          />
          <IPayLinearGradientView
            gradientColors={colors.appGradient.gradientPrimary30}
            useAngle
            angle={-90}
            style={styles.gradientView}
          >
            <IPayView style={styles.listContainer}>
              <IPayView style={styles.listView}>
                <IPayFootnoteText text="TOP_UP.POINTS_REDEEMED" color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${params?.redeemPoints} ${t('COMMON.POINTS')}`}
                    style={styles.detailText}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
            <IPayView style={styles.listContainer}>
              <IPayView style={styles.listView}>
                <IPayFootnoteText text="TOP_UP.EQUIVALENT_BALANCE" color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${params?.redeemAmount} ${t('COMMON.SAR')}`}
                    style={styles.detailText}
                    shouldTranslate={false}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
          </IPayLinearGradientView>

          <IPayView style={styles.remainingDetails}>
            <IPayView style={styles.listContainer}>
              <IPayView style={styles.listView}>
                <IPayFootnoteText text="TOP_UP.REMAINING_POINTS" color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${getRemainPoints()} ${t('COMMON.POINTS')}`}
                    style={styles.detailText}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
          </IPayView>
        </IPayView>
        <IPayButton
          onPress={onConfirm}
          btnType={buttonVariants.PRIMARY}
          btnText="COMMON.CONFIRM"
          btnIconsDisabled
          textColor={colors.natural.natural0}
          btnStyle={[styles.confirmButton]}
        />
      </IPaySafeAreaView>
      <IPayPortalBottomSheet
        heading="TOP_UP.REDEEM_POINTS"
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        isVisible={isOtpSheetVisible}
        ref={pointRemdemptionBottomSheetRef}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={onConfirmOtp}
          mobileNumber={walletInfo?.mobileNumber ? walletInfo?.mobileNumber : ''}
          setOtp={setOtp}
          otp={otp}
          setOtpError={setOtpError}
          otpError={otpError}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.akhtrPoints.otpTimeout}
          onResendCodePress={onResendCodePress}
        />
      </IPayPortalBottomSheet>
      <IPayBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={SNAP_POINTS.MEDIUM_LARGE}
        ref={helpCenterRef}
      >
        <HelpCenterComponent testID="help-center-bottom-sheet" />
      </IPayBottomSheet>
    </IPayView>
  );
};

export default IPayPointsRedemptionConfirmation;
