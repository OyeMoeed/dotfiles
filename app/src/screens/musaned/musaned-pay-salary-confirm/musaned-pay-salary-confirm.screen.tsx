import React, { useRef, useState } from 'react';

import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';

import { IPayFlatlist, IPayFootnoteText, IPayScrollView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayLaborerDetailsBanner from '@app/components/organism/ipay-laborer-details-banner/ipay-laborer-details-banner.component';
import { SNAP_POINT } from '@app/constants/constants';
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
import {
  transferToMusanedConfirm,
  TransferToMusanedConfirmReqPayload,
  transferToMusanedPrepare,
} from '@app/network/services/musaned';
import { getDeviceInfo } from '@app/network/utilities';
import { TransferToMusanedPrepareReqPayload } from '@app/network/services/musaned/transfer-to-musaned-prepare/transfer-to-musaned-prepare.interface';
import { ApiResponseStatusType, APIResponseType } from '@app/utilities';

import { convertToBEDate, getPaymentSalaryConfirmationData } from '../musaned.utils';
import {
  MusanedPayConfirmationRouteProps,
  MusanedPaySalaryConfirmScreenProps,
} from './musaned-pay-salary-confirm.interface';
import musanedPaySalaryConfirm from './musaned-pay-salary-confirm.style';
import { SalaryCategories } from '../musaned-pay-salary/musaned-pay-salary.interface';

const MusanedPaySalaryConfirmScreen: React.FC<MusanedPaySalaryConfirmScreenProps> = () => {
  const { params } = useRoute<MusanedPayConfirmationRouteProps>();
  const { salaryType, basicSalary, bonusAmount, fromDate, toDate, extraAmount, deductionAmount, totalSalary } =
    params?.paymentInfo || {};
  const { name, occupationAr, occupationEn, poiNumber } = params.userInfo || {};

  const { t } = useTranslation();
  const { colors } = useTheme();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { otpConfig } = useConstantData();
  const styles = musanedPaySalaryConfirm(colors);

  const detailsInfo = getPaymentSalaryConfirmationData(params?.paymentInfo, params.userInfo);

  const otpVerificationRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [responsePrepare, setResponsePrepare] = useState<{ otpRef?: string; transactionId?: string }>({});

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
      let payload: TransferToMusanedPrepareReqPayload = {
        deviceInfo: await getDeviceInfo(),
        employeePoi: String(poiNumber),
      };

      switch (salaryType.id) {
        case SalaryCategories.Monthly_Salary:
          payload = {
            ...payload,
            transferJustificationType: deductionAmount
              ? SalaryCategories.TRX_JUSTIFICATION_Type_Deducted_Salary
              : SalaryCategories.TRX_JUSTIFICATION_Type_Monthly_Salary,
            salaryMonth: convertToBEDate(fromDate || ''),
            bonusAmount: extraAmount,
            amountWithDeduction: deductionAmount ? String(Number(basicSalary) - Number(deductionAmount)) : '0',
          };
          break;
        case SalaryCategories.Advanced_Salary:
          payload = {
            ...payload,
            transferJustificationType: SalaryCategories.TRX_JUSTIFICATION_Type_Advanced_Salary,
            fromMonth: convertToBEDate(fromDate || ''),
            toMonth: (toDate as string)?.split('/').join('-'),
            bonusAmount: extraAmount,
            // TODO: Check with the BE and PO
            // amountWithDeduction: deductionAmount ? String(Number(basicSalary) - Number(deductionAmount)) : '0',
          };
          break;
        case SalaryCategories.Bonus_Salary:
          payload = {
            ...payload,
            transferJustificationType: SalaryCategories.TRX_JUSTIFICATION_Type_Bonus_Salary,
            bonusAmount: bonusAmount || '',
          };
          break;
        default:
          break;
      }

      const prepareMusaned = await transferToMusanedPrepare({ walletNumber: walletInfo.walletNumber }, payload);
      if (prepareMusaned?.status?.type === ApiResponseStatusType.SUCCESS) {
        if (showOtpSheet) {
          setResponsePrepare({
            otpRef: prepareMusaned.response.otpRef,
            transactionId: prepareMusaned.authentication.transactionId,
          });
          setOtpSheetVisible(true);

          otpVerificationRef?.current?.present();
        }
        otpVerificationRef?.current?.resetInterval();
      }
    }
  };

  const onOtpCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
    setOtp('');
  };

  const confirmMusanedTransfer = async () => {
    const confirmPayload: TransferToMusanedConfirmReqPayload = {
      otpRef: responsePrepare.otpRef || '',
      otp: 'otp',
      deviceInfo: await getDeviceInfo(),
      authentication: {
        transactionId: responsePrepare.transactionId || '',
      },
    };
    const apiConfirmationResponse = await transferToMusanedConfirm(
      { walletNumber: walletInfo.walletNumber },
      confirmPayload,
    );

    if (apiConfirmationResponse.status.type === APIResponseType.SUCCESS) {
      onOtpCloseBottomSheet();
      navigate(ScreenNames.MUSANED_PAYMENT_SUCCESSFUL, {
        ...params,
      });
    } else {
      setOtpError(true);
    }
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
        <IPaySubHeadlineText regular style={styles.subHeadline} numberOfLines={2} text={item.details} />
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
              containerStyle={styles.laborerDetailsBanner}
              withProfileIcon
              withLogoOnRight
              boldTitle={false}
            />
            <IPayFlatlist style={styles.detailsFlex} scrollEnabled={false} data={detailsInfo} renderItem={renderInfo} />
          </IPayView>
        </IPayView>
      </IPayScrollView>

      <IPayView style={styles.buttonContainer}>
        <SadadFooterComponent
          btnText="COMMON.CONFIRM"
          disableBtnIcons
          btnDisabled={false}
          testID="ipay-bill"
          totalAmount={totalSalary}
          totalAmountText="MUSANED.TOTAL_AMOUNT"
          onPressBtn={handleOnConfirmPress}
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
