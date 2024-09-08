import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton, IPayChip, IPayHeader, IPayList } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { IW2WTransferConfirmReq } from '@app/network/services/transfers/wallet-to-wallet-transfer-confirm/wallet-to-wallet-transfer-confirm.interface';
import walletToWalletTransferConfirm from '@app/network/services/transfers/wallet-to-wallet-transfer-confirm/wallet-to-wallet-transfer-confirm.service';
import { IW2WTransferPrepareReq } from '@app/network/services/transfers/wallet-to-wallet-transfer-prepare/wallet-to-wallet-transfer-prepare.interface';
import walletToWalletTransferPrepare from '@app/network/services/transfers/wallet-to-wallet-transfer-prepare/wallet-to-wallet-transfer-prepare.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { ApiResponseStatusType, buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { GiftParamsProps, GiftTransferSummaryItem, SendMoneyType } from './gift-transfer-summary.interface';
import transferSummaryStyles from './gift-transfer-summary.styles';

const TransferSummaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const route = useRoute<
    RouteProp<{
      params: GiftParamsProps;
      key: {};
      name: {};
    }>
  >();
  const { transfersDetails, transactionType, activeFriends } = (route.params as GiftParamsProps).data;
  const { giftDetails } = transfersDetails;
  const [otp, setOtp] = useState<string>('');
  const [otpRef, setOtpRef] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>();
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [expandMsg, setExpandMsg] = useState<boolean>(false);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { otpConfig } = useConstantData();
  const styles = transferSummaryStyles(colors);
  const sendMoneyBottomSheetRef = useRef<any>(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);
  const otpSheetHeading =
    transactionType === TransactionTypes.SEND_GIFT ? localizationText.HOME.SEND_GIFT : localizationText.HOME.SEND_MONEY;

  const toggleExpandMessage = () => setExpandMsg(!expandMsg);

  const isItemHasWallet = (item: SendMoneyType): boolean => {
    const walletNumber = activeFriends?.filter((activeFriend) => activeFriend?.mobileNumber === item?.mobileNumber)[0]
      ?.walletNumber;

    if (walletNumber == null || !walletNumber) {
      return false;
    }
    return true;
  };

  const transfersRequestsList = transfersDetails?.formInstances?.map((item) => {
    const isAlinma = isItemHasWallet(item);

    const transferDetails = [
      {
        id: '1',
        label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
        value: item?.name,
        leftIcon: isAlinma ? images.alinmaP : icons.user_square,
        color: isAlinma ? undefined : colors.primary.primary900,
        isAlinma,
      },
      {
        id: '2',
        label: localizationText.TRANSFER_SUMMARY.AMOUNT,
        value: `${item.amount} ${localizationText.COMMON.SAR}`,
      },
    ];

    return transferDetails;
  });

  const giftMessage = () => (
    <IPayView style={styles.faqItemContainer}>
      <IPayPressable onPress={toggleExpandMessage} style={styles.faqItemHeader}>
        <IPayView style={styles.listView}>
          <IPayFootnoteText regular style={styles.faqItemText}>
            {localizationText.COMMON.MESSAGE}
          </IPayFootnoteText>
          <IPayIcon
            icon={expandMsg ? icons.arrowUp : icons.ARROW_DOWN}
            size={18}
            color={colors.natural.natural500}
            style={expandMsg ? styles.faqItemIconExpanded : styles.faqItemIcon}
          />
        </IPayView>
      </IPayPressable>
      {expandMsg && (
        <IPayCaption1Text regular style={styles.faqItemAnswer}>
          {giftDetails?.message}
        </IPayCaption1Text>
      )}
    </IPayView>
  );

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
  const renderNonAlinmaPayItem = ({ item, index }: { item: GiftTransferSummaryItem; index: number }) => {
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
  };

  const prepareOtp = async () => {
    sendMoneyBottomSheetRef.current?.present();

    showSpinner({
      variant: spinnerVariant.DEFAULT,
      hasBackgroundColor: true,
    });
    const payload: IW2WTransferPrepareReq = {
      requests: transfersDetails?.formInstances?.map((item) => ({
        mobileNumber: item.mobileNumber,
        amount: item.amount,
        note: item.notes,
        transferPurpose: item?.transferPurpose,
      })),
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
    };
    const apiResponse = await walletToWalletTransferPrepare(walletInfo.walletNumber, payload);
    if (apiResponse.status.type === ApiResponseStatusType.SUCCESS) {
      setOtpRef(apiResponse?.response?.otpRef as string);
      setTransactionId(apiResponse?.authentication?.transactionId);
      sendMoneyBottomSheetRef.current?.present();
    }
    hideSpinner();
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    const payload: IW2WTransferConfirmReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      otp,
      otpRef,
      authentication: {
        transactionId: transactionId as string,
      },
    };

    const apiResponse = await walletToWalletTransferConfirm(walletInfo.walletNumber, payload);

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      if (apiResponse?.response) {
        sendMoneyBottomSheetRef.current?.close();
        navigate(ScreenNames.GIFT_TRANSFER_SUCCESS_SCREEN, {
          transferDetails: {
            formData: transfersDetails.formInstances,
            apiData: apiResponse?.response.transferRequestsResult,
          },
          totalAmount: transfersDetails?.formInstances?.[0]?.totalAmount,
        });
      }
    } else {
      setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
    }
    setIsLoading(false);
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE);
    } else {
      verifyOtp();
    }
  };

  const onSubmit = () => {
    prepareOtp();
  };

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientPrimary50}>
      <IPayHeader backBtn title={localizationText.TRANSFER_SUMMARY.TITLE} applyFlex />
      <IPayView style={styles.reasonContainer}>
        <IPayList title={localizationText.SEND_GIFT_SUMMARY.OCCASION} showDetail detailText={giftDetails?.occasion} />
        {giftMessage()}
      </IPayView>
      <IPayView style={styles.container}>
        <IPayView>
          {transfersRequestsList?.map((item) => {
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
        </IPayView>
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          btnIconsDisabled
          btnText={localizationText.COMMON.CONFIRM}
          btnColor={colors.primary.primary500}
          large
          onPress={onSubmit}
        />
      </IPayView>
      <IPayBottomSheet
        heading={otpSheetHeading}
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINTS.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={sendMoneyBottomSheetRef}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={onConfirmOtp}
          mobileNumber={userInfo?.mobileNumber as string}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          apiError={apiError}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          onResendCodePress={() => {}}
          timeout={otpConfig.transaction.otpTimeout}
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
    </IPaySafeAreaView>
  );
};

export default TransferSummaryScreen;
