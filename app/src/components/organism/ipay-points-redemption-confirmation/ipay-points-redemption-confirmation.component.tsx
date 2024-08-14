import { IPayFootnoteText, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import IPayPointRedemptionCard from '@app/components/atoms/ipay-point-redemption-card/ipay-point-redemption-card.component';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { CONTACT_NUMBER, SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { FC, useRef, useState } from 'react';
import redeemPointsPrepare from '@app/network/services/cards-management/mazaya-topup/redeem-points-prepare/redeem-points-prepare.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { spinnerVariant, TopupStatus } from '@app/utilities/enums.util';
import redeemPointsConfirm from '@app/network/services/cards-management/mazaya-topup/redeem-points-confirm/redeem-points-confirm.service';
import {
  IRedeemPointsConfirmReq,
  IRedeemPointsConfirmRes,
} from '@app/network/services/cards-management/mazaya-topup/redeem-points-confirm/redeem-points-confirm.interface';
import pointRedemptionConfirmation from './ipay-points-redemption-confirmation.style';
import { IPayPointRedemptionConfirmatonProps } from './ipay-points-redemption-confirmation.interface';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import useConstantData from '@app/constants/use-constants';

const IPayPointsRedemptionConfirmation: FC<IPayPointRedemptionConfirmatonProps> = ({ testID, params }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pointRemdemptionBottomSheetRef = useRef<bottomSheetTypes>(null);
  const [apiError, setAPIError] = useState<string>('');
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const styles = pointRedemptionConfirmation(colors);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const {  otpConfig} = useConstantData()

  const onConfirm = async () => {
    showSpinner({
      variant: spinnerVariant.DEFAULT,
      hasBackgroundColor: true,
    });
    const apiResponse = await redeemPointsPrepare(walletInfo.walletNumber, {
      deviceInfo: await getDeviceInfo(),
    });
    if (apiResponse.status.type === 'SUCCESS') {
      pointRemdemptionBottomSheetRef.current?.present();
    }
    hideSpinner();
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
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
    pointRemdemptionBottomSheetRef.current?.close();
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    const payload: IRedeemPointsConfirmReq = {
      deviceInfo: await getDeviceInfo(),
      otp,
      redeemPoints: params.redeemPoints,
      redeemAmount: params.redeemAmount,
    };

    const apiResponse = await redeemPointsConfirm(walletInfo.walletNumber, payload);

    if (apiResponse?.status?.type === 'SUCCESS') {
      if (apiResponse?.response)
        onConfirmOtpVerification({ ...apiResponse?.response, topupStatus: TopupStatus.SUCCESS });
    } else {
      setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      onConfirmOtpVerification({
        ...apiResponse?.response,
        topupStatus: TopupStatus.FAILED,
      } as IRedeemPointsConfirmRes);
    }
    setIsLoading(false);
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      verifyOtp();
    }
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPaySafeAreaView style={styles.container}>
        <IPayHeader title={localizationText.TOP_UP.REDEEM_POINTS} backBtn applyFlex />

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
                <IPayFootnoteText text={localizationText.TOP_UP.POINTS_REDEEMED} color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${params?.redeemPoints} ${localizationText.COMMON.POINTS}`}
                    style={styles.detailText}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
            <IPayView style={styles.listContainer}>
              <IPayView style={styles.listView}>
                <IPayFootnoteText text={localizationText.TOP_UP.EQUIVALENT_BALANCE} color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${params?.redeemAmount} ${localizationText.COMMON.SAR}`}
                    style={styles.detailText}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
          </IPayLinearGradientView>

          <IPayView style={styles.remainingDetails}>
            <IPayView style={styles.listContainer}>
              <IPayView style={styles.listView}>
                <IPayFootnoteText text={localizationText.TOP_UP.REMAINING_POINTS} color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${getRemainPoints()} ${localizationText.COMMON.POINTS}`}
                    style={styles.detailText}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
          </IPayView>
        </IPayView>
        <IPayButton
          onPress={onConfirm}
          btnType="primary"
          btnText={localizationText.COMMON.CONFIRM}
          btnIconsDisabled
          textColor={colors.natural.natural0}
          btnStyle={[styles.confirmButton]}
        />
      </IPaySafeAreaView>
      <IPayBottomSheet
        heading={localizationText.TOP_UP.REDEEM}
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINTS.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={pointRemdemptionBottomSheetRef}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={onConfirmOtp}
          mobileNumber={CONTACT_NUMBER}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          apiError={apiError}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.akhtrPoints.otpTimeout}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
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
