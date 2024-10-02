import React, { useRef, useState } from 'react';

import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';

import { IPayFlatlist, IPayFootnoteText, IPayScrollView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayLaborerDetailsBanner from '@app/components/organism/ipay-laborer-details-banner/ipay-laborer-details-banner.component';
import constants, { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import checkUserAccess from '@app/utilities/check-user-access';
import { isArabic } from '@app/utilities/constants';
import { useRoute } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { getPaymentSalaryConfirmationData } from '../musaned.utils';
import {
  MusanedPayConfirmationRouteProps,
  MusanedPaySalaryConfirmScreenProps,
} from './musaned-pay-salary-confirm.interface';
import musanedPaySalaryConfirm from './musaned-pay-salary-confirm.style';

const MusanedPaySalaryConfirmScreen: React.FC<MusanedPaySalaryConfirmScreenProps> = () => {
  const { params } = useRoute<MusanedPayConfirmationRouteProps>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { otpConfig } = useConstantData();
  const styles = musanedPaySalaryConfirm(colors);

  const { name, occupationAr, occupationEn } = params.userInfo || {};
  const detailsInfo = getPaymentSalaryConfirmationData(params?.paymentInfo, params.userInfo);

  const otpVerificationRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [, setOtpRef] = useState<string>('');

  const onHelpCenterCloseBottomSheet = () => {
    helpCenterRef?.current?.close();
  };

  const handleOnPressHelp = (): void => {
    helpCenterRef?.current?.present();
    setOtpSheetVisible(false);
  };

  const prepareOtp = async (showOtpSheet: boolean) => {
    const hasAccess = checkUserAccess();
    if (hasAccess) {
      if (constants.MOCK_API_RESPONSE) {
        setOtpRef('1111');
        if (showOtpSheet) {
          setOtpSheetVisible(true);
          otpVerificationRef?.current?.present();
        }
        otpVerificationRef?.current?.resetInterval();
        return;
      }

      // TODO: Add same mock logic when API is ready
      otpVerificationRef?.current?.resetInterval();
    }
  };

  const onOtpCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
    setOtp('');
  };

  const confirmMusanedTransfer = () => {
    onOtpCloseBottomSheet();
    navigate(ScreenNames.MUSANED_PAYMENT_SUCCESSFUL);
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    } else {
      confirmMusanedTransfer();
    }
  };

  const handleOnConfirmPress = () => {
    prepareOtp(true);
  };

  const onResendCodePress = () => {
    prepareOtp(false);
  };

  const renderInfo = ({
    item,
  }: {
    item: {
      text: string;
      details: string;
    };
  }) => (
    <IPayView style={styles.cardStyle}>
      <IPayFootnoteText style={styles.personalInfoCardTitleText} regular text={item?.text} />
      <IPayView style={styles.detailsContainer}>
        <IPaySubHeadlineText
          regular
          style={styles.subHeadline}
          numberOfLines={2}
          shouldTranslate={false}
          text={item.details}
        />
      </IPayView>
    </IPayView>
  );

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title="MUSANED.HEADER" />

      <IPayScrollView>
        <IPayView style={styles.container}>
          <IPayView style={styles.walletBackground}>
            <IPayLaborerDetailsBanner
              titleText={name}
              testID="musaned-user-details-laborer-details-banner"
              shouldTranslateTitle={false}
              details={isArabic ? occupationAr : occupationEn}
              isDetailsBanner
            />
            <IPayFlatlist style={styles.detailsFlex} scrollEnabled={false} data={detailsInfo} renderItem={renderInfo} />
          </IPayView>
        </IPayView>
      </IPayScrollView>

      <IPayView style={styles.buttonContainer}>
        <SadadFooterComponent
          btnText="COMMON.CONFIRM"
          disableBtnIcons
          btnDisbaled={false}
          testID="ipay-bill"
          showTopMessage
          totalAmountText="COMMON.TOTAL_AMOUNT"
          onPressBtn={handleOnConfirmPress}
          partialPay
        />
      </IPayView>

      <IPayPortalBottomSheet
        testID="help-center-bottom-sheet"
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        ref={helpCenterRef}
        onCloseBottomSheet={onHelpCenterCloseBottomSheet}
        isVisible
        defaultIndex={-1}
      >
        <HelpCenterComponent />
      </IPayPortalBottomSheet>

      <IPayPortalBottomSheet
        heading="MUSANED.HEADER"
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onOtpCloseBottomSheet}
        isVisible={isOtpSheetVisible}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={onConfirmOtp}
          mobileNumber={walletInfo?.mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          otp={otp}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.transaction.otpTimeout}
          onResendCodePress={onResendCodePress}
        />
      </IPayPortalBottomSheet>
    </IPaySafeAreaView>
  );
};

export default MusanedPaySalaryConfirmScreen;
