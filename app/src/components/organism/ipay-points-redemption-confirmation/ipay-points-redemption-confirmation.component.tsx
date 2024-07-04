import { IPayFootnoteText, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import IPayPointRedemptionCard from '@app/components/atoms/ipay-point-redemption-card/ipay-point-redemption-card.component';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '@app/screens/auth/forgot-passcode/otp-verification.component';
import useTheme from '@app/styles/hooks/theme.hook';
import { FC, useRef } from 'react';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import { IPayPointRedemptionConfirmatonProps } from './ipay-points-redemption-confirmation.interface';
import pointRedemptionConfirmation from './ipay-points-redemption-confirmation.style';

const IPayPointsRedemptionConfirmation: FC<IPayPointRedemptionConfirmatonProps> = ({ testID }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();

  const styles = pointRedemptionConfirmation(colors);
  const pointRemdemptionBottomSheetRef = useRef(null);

  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);

  const onConfirm = () => {
    pointRemdemptionBottomSheetRef.current?.present();
  };
  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPaySafeAreaView style={styles.container}>
        <IPayHeader title={localizationText.top_up} backBtn applyFlex />

        <IPayView style={styles.redemptionConfirmDetail}>
          <IPayPointRedemptionCard
            containerStyle={styles.redemptionCardStyle}
            backgroundImageStyle={styles.redemptionCardBackgroundImage}
          />
          <IPayLinearGradientView
            gradientColors={colors.appGradient.gradientPrimary30}
            useAngle={true}
            angle={-90}
            style={styles.gradientView}
          >
            <IPayView style={styles.listContainer}>
              <IPayView style={styles.listView}>
                <IPayFootnoteText text={localizationText.points_redeemed} color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${2400} ${localizationText.points}`}
                    style={styles.detailText}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
            <IPayView style={styles.listContainer}>
              <IPayView style={styles.listView}>
                <IPayFootnoteText text={localizationText.equivalent_balance} color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${80}.00 ${localizationText.SAR}`}
                    style={styles.detailText}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
          </IPayLinearGradientView>

          <IPayView style={styles.remainingDetails}>
            <IPayView style={styles.listContainer}>
              <IPayView style={styles.listView}>
                <IPayFootnoteText text={localizationText.remaining_points} color={colors.natural.natural900} />
                <IPayView style={styles.listDetails}>
                  <IPayFootnoteText
                    color={colors.primary.primary800}
                    text={`${600} ${localizationText.points}`}
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
          btnText={localizationText.confirm}
          btnIconsDisabled
          textColor={colors.natural.natural0}
          btnStyle={[styles.confirmButton]}
        />
      </IPaySafeAreaView>
      <IPayBottomSheet
        heading={localizationText.redeem_points}
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={['1%', '95%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={pointRemdemptionBottomSheetRef}
      >
        <OtpVerificationComponent
          ref={otpVerificationRef}
          testID={'otp-verification-bottom-sheet'}
          onCallback={() => {
            navigate(screenNames.POINTS_REDEMPTIONS_SUCCESS_AND_FAILED);
            pointRemdemptionBottomSheetRef.current?.close();
          }}
          onPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '95%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent testID={'help-center-bottom-sheet'} />
      </IPayBottomSheet>
    </IPayView>
  );
};

export default IPayPointsRedemptionConfirmation;
