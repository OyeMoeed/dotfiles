import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton, IPayChip, IPayHeader } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { IW2WResRequest } from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.interface';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { IW2WTransferConfirmReq } from '@app/network/services/transfers/wallet-to-wallet-transfer-confirm/wallet-to-wallet-transfer-confirm.interface';
import walletToWalletTransferConfirm from '@app/network/services/transfers/wallet-to-wallet-transfer-confirm/wallet-to-wallet-transfer-confirm.service';
import { IW2WTransferPrepareReq } from '@app/network/services/transfers/wallet-to-wallet-transfer-prepare/wallet-to-wallet-transfer-prepare.interface';
import walletToWalletTransferPrepare from '@app/network/services/transfers/wallet-to-wallet-transfer-prepare/wallet-to-wallet-transfer-prepare.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import { IW2WTransferSummaryItem, ParamsProps } from './transfer-summary-screen.interface';
import transferSummaryStyles from './transfer-summary.styles';

const TransferSummaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const route = useRoute<
    RouteProp<{
      params: ParamsProps;
      key: {};
      name: {};
    }>
  >();
  const { transfersDetails, transactionType, totalAmount } = (route.params as ParamsProps).data;

  const [otp, setOtp] = useState<string>('');
  const [otpRef, setOtpRef] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>();
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError] = useState<string>('');
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { otpConfig } = useConstantData();
  const styles = transferSummaryStyles(colors);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);

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

  const isItemHasWallet = (item: IW2WResRequest): boolean => {
    const walletNumber = transfersDetails.activeFriends?.filter(
      (activeFriend) => activeFriend?.mobileNumber === item?.mobileNumber,
    )[0]?.walletNumber;

    if (walletNumber == null || !walletNumber) {
      return false;
    }
    return true;
  };

  const transfersRequestsList: any[] = transfersDetails?.fees?.map((item, index) => {
    const hasWallet = isItemHasWallet(item);
    if (!hasWallet) {
      return [
        {
          id: '1',
          label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
          value: transfersDetails.formInstances[index]?.subtitle,
          leftIcon: icons.user_square,
          color: colors.primary.primary900,
          isAlinma: false,
        },
        { id: '2', label: localizationText.TRANSFER_SUMMARY.AMOUNT, value: item.amount },
        {
          id: '3',
          label: localizationText.TRANSFER_SUMMARY.REASON,
          value: transfersDetails.formInstances[index]?.selectedItem?.text,
        },
      ];
    }

    return [
      {
        id: '1',
        label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
        value: transfersDetails.formInstances[index]?.subtitle,
        leftIcon: images.alinmaP,
        isAlinma: true,
      },
      { id: '2', label: localizationText.TRANSFER_SUMMARY.AMOUNT, value: item.amount },
      {
        id: '3',
        label: localizationText.TRANSFER_SUMMARY.REASON,
        value: transfersDetails.formInstances[index]?.selectedItem?.text,
      },
      { id: '4', label: localizationText.TRANSFER_SUMMARY.NOTE, value: item.note },
    ];
  });

  const renderWalletPayItem = ({ item }) => {
    const renderLeftIcon = () => {
      if (item?.leftIcon) {
        if (item.isAlinma) {
          return (
            <IPayView style={styles.leftIcon}>
              <IPayImage image={item.leftIcon} style={styles.alinmaLogo} resizeMode="contain" />
            </IPayView>
          );
        }
        return (
          <IPayPressable style={styles.appleIcon} onPress={item.onPress}>
            <IPayIcon icon={item.leftIcon} style={styles.appleIcon} color={item.color} size={18} />
          </IPayPressable>
        );
      }
      return null;
    };

    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.walletListBackground}>
          <IPayView style={styles.iconLabel}>
            {renderLeftIcon()}
            <IPayFootnoteText text={item?.label} style={styles.label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={item?.value} style={styles.detailsText} />
            {item?.icon && (
              <IPayPressable style={styles.appleIcon} onPress={item?.onPress}>
                <IPayIcon icon={item?.icon} style={styles.appleIcon} color={item?.color} size={scaleSize(18)} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };
  const renderNonAlinmaPayItem = ({ item, index }: { item: IW2WTransferSummaryItem; index: number }) => {
    const isFirstItem = index === 0;

    return (
      <IPayView key={item.id}>
        {isFirstItem && (
          <IPayView style={styles.chipContainer}>
            <IPayChip
              containerStyle={styles.chipColors}
              icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
              textValue={localizationText.TRANSFER_SUMMARY.CHIP_TITLE}
              headingStyles={styles.chipColors}
            />
          </IPayView>
        )}
        {renderWalletPayItem({ item })}
      </IPayView>
    );
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
  };

  const prepareOtp = async (showOtpSheet: boolean = true) => {
    renderSpinner(true);
    const payload: IW2WTransferPrepareReq = {
      requests: transfersDetails.formInstances.map((item) => ({
        mobileNumber: item.mobileNumber,
        amount: item.amount,
        note: item.notes,
        transferPurpose: item.selectedItem.id as string,
      })),
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
    };
    const apiResponse = await walletToWalletTransferPrepare(walletInfo.walletNumber, payload);
    if (apiResponse.status.type === 'SUCCESS') {
      setOtpRef(apiResponse?.response?.otpRef as string);
      setTransactionId(apiResponse?.authentication?.transactionId);
      if (showOtpSheet) {
        setOtpSheetVisible(true);
      }
    }
    otpVerificationRef?.current?.resetInterval();
    renderSpinner(false);
  };

  const verifyOtp = async () => {
    renderSpinner(true);
    const payload: IW2WTransferConfirmReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      otp,
      otpRef,
      authentication: {
        transactionId: transactionId as string,
      },
    };

    const apiResponse = await walletToWalletTransferConfirm(walletInfo.walletNumber, payload);

    if (apiResponse?.status?.type === 'SUCCESS') {
      if (apiResponse?.response) {
        setOtpSheetVisible(false);
        navigate(ScreenNames.W2W_TRANSFER_SUCCESS, {
          transferDetails: {
            formData: transfersDetails.formInstances,
            apiData: apiResponse?.response.transferRequestsResult,
          },
          totalAmount,
        });
      }
    } else {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    }
    renderSpinner(false);
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      verifyOtp();
    }
  };

  const onSubmit = () => {
    prepareOtp();
  };

  const onResendCodePress = () => {
    prepareOtp(false);
  };

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientPrimary50}>
      <IPayHeader backBtn title={localizationText.TRANSFER_SUMMARY.TITLE} applyFlex />
      <IPayView style={styles.container}>
        <IPayView style={styles.scrollViewContainer}>
          <IPayScrollView>
            <>
              {transfersRequestsList.map((item) => {
                if (item[0].isAlinma) {
                  return (
                    <IPayView style={styles.walletBackground} key={item[0].value}>
                      <IPayFlatlist
                        style={styles.detailesFlex}
                        scrollEnabled={false}
                        data={item}
                        renderItem={renderWalletPayItem}
                      />
                    </IPayView>
                  );
                }
                return (
                  <IPayView style={styles.walletBackground} key={item[0].value}>
                    <IPayFlatlist
                      style={styles.detailesFlex}
                      scrollEnabled={false}
                      data={item}
                      renderItem={renderNonAlinmaPayItem}
                    />
                  </IPayView>
                );
              })}
            </>
          </IPayScrollView>
        </IPayView>
        <IPayView style={styles.buttonContainer}>
          {/* Crashed inside wallet to wallet transfer */}
          {/* {transactionType === TransactionTypes.SEND_GIFT && (
            <IPayList
              title={localizationText.TRANSACTION_HISTORY.TOTAL_AMOUNT}
              showDetail
              detailTextStyle={styles.listTextStyle}
              detailText={`${amount} ${localizationText.COMMON.SAR}`}
            />
          )} */}
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnIconsDisabled
            btnText={localizationText.COMMON.CONFIRM}
            btnColor={colors.primary.primary500}
            large
            onPress={onSubmit}
          />
        </IPayView>
      </IPayView>
      <IPayPortalBottomSheet
        heading={
          transactionType === TransactionTypes.SEND_GIFT
            ? localizationText.HOME.SEND_GIFT
            : localizationText.HOME.SEND_MONEY
        }
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        isVisible={isOtpSheetVisible}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={onConfirmOtp}
          mobileNumber={userInfo?.mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          apiError={apiError}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.transaction.otpTimeout}
          onResendCodePress={onResendCodePress}
        />
      </IPayPortalBottomSheet>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={SNAP_POINTS.MEDIUM_LARGE}
        ref={helpCenterRef}
        testID="transfer-details-help-center"
      >
        <HelpCenterComponent testID="help-center-bottom-sheet" />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default TransferSummaryScreen;
