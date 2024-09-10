import React, { useCallback, useEffect, useRef, useState } from 'react';

import icons from '@app/assets/icons';
import IPayCardDetails from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import constants, { SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';

import { IPayFootnoteText, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayList } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  CARD_STATUS,
  changeStatusProp,
  resetPinCodeProp,
} from '@app/network/services/core/transaction/transaction.interface';
import {
  changeStatus,
  prepareResetCardPinCode,
  resetPinCode,
} from '@app/network/services/core/transaction/transactions.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { useTypedSelector } from '@app/store/store';
import { ApiResponseStatusType, toastTypes } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { IPayOtpVerification, IPaySafeAreaView } from '@components/templates';
import { RouteProp, useRoute } from '@react-navigation/native';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import IPayChangeCardPin from '../change-card-pin/change-card-pin.screens';
import IPayCardOptionsIPayListDescription from './card-options-ipaylist-description';
import IPayCardOptionsIPayListToggle from './card-options-ipaylist-toggle';
import { ChangePinRefTypes, DeleteCardSheetRefTypes, RouteParams } from './card-options.interface';
import cardOptionsStyles from './card-options.style';

const CardOptionsScreen: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const {
    currentCard,
    currentCard: { cardType, cardHeaderText, name, maskedCardNumber, cardIndex },
  } = route.params;

  const changePinRef = useRef<ChangePinRefTypes>(null);
  const openBottomSheet = useRef<bottomSheetTypes>(null);
  const deleteCardSheetRef = useRef<DeleteCardSheetRefTypes>({
    hide() {},
    show() {},
  });

  const localizationText = useLocalization();
  const { showToast } = useToastContext();

  const styles = cardOptionsStyles(colors);

  const [isOnlinePurchase, setIsOnlinePurchase] = useState(false);
  const [isATMWithDraw, setIsATMWithDraw] = useState(false);
  const otpVerificationRef: any = useRef(null);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const { otpConfig } = useConstantData();
  const [apiError, setAPIError] = useState<string>('');
  const helpCenterRef = useRef(null);
  const [otpRef, setOtpRef] = useState<string>('');
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [pin, setPin] = useState('');
  const [cardStatus, setCardStatus] = useState<string>();

  useEffect(() => {
    initOnlinePurchase();
  }, []);

  const initOnlinePurchase = () => {
    if (currentCard.cardStatus == CARD_STATUS.ONLINE_PURCHASE_ENABLE) {
      // check if online purchase is enabled
      setIsOnlinePurchase(true);
    } else {
      setIsOnlinePurchase(false);
    }
  };

  const getToastSubTitle = () =>
    `${cardType} ${cardHeaderText}  - *** ${constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}`;

  const renderToast = (title: string, isOn: boolean, icon: string, isFromDelete: boolean) => {
    showToast({
      title,
      subTitle: getToastSubTitle(),
      containerStyle: isFromDelete ? styles.isFromDeleteStyle : styles.toastContainerStyle,
      leftIcon: <IPayIcon icon={icon} size={24} color={colors.natural.natural0} />,
      toastType: isOn ? toastTypes.SUCCESS : toastTypes.WARNING,
    });
  };

  const changeOnlinePurchase = async (isOn?: boolean, newStatus?: string) => {
    const payload: changeStatusProp = {
      walletNumber: walletNumber,
      body: {
        status: newStatus,
        cardIndex: currentCard?.cardIndex,
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await changeStatus(payload);
    switch (apiResponse?.status?.type) {
      case ApiResponseStatusType.SUCCESS:
        setIsOnlinePurchase((prev) => !prev);
        renderToast(
          isOn
            ? localizationText.CARD_OPTIONS.ONLINE_PURCHASE_ENABLED
            : localizationText.CARD_OPTIONS.ONLINE_PURCHASE_DISABLED,
          isOn || true,
          icons.receipt_item,
          false,
        );
        break;
      case apiResponse?.apiResponseNotOk:
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
        break;
      case ApiResponseStatusType.FAILURE:
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
        break;
      default:
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
        break;
    }
  };

  const toggleOnlinePurchase = (isOn: boolean) => {
    if (currentCard?.cardStatus == CARD_STATUS.ONLINE_PURCHASE_DISABLE) {
      changeOnlinePurchase(true, CARD_STATUS.ONLINE_PURCHASE_ENABLE);
    } else if (currentCard?.cardStatus == CARD_STATUS.ONLINE_PURCHASE_ENABLE) {
      changeOnlinePurchase(false, CARD_STATUS.ONLINE_PURCHASE_DISABLE);
    }
  };

  const toggleATMWithdraw = (isOn: boolean) => {
    setIsATMWithDraw((prev) => !prev);
    renderToast(
      isOn ? localizationText.CARD_OPTIONS.ATM_WITHDRAW_ENABLED : localizationText.CARD_OPTIONS.ATM_WITHDRAW_DISABLED,
      isOn,
      icons.moneys,
      false,
    );
  };

  const onCloseBottomSheet = () => {
    changePinRef.current?.resetInterval();
    openBottomSheet.current?.close();
  };

  const stopCard = async () => {
    const payload: changeStatusProp = {
      walletNumber: walletNumber,
      body: {
        status: CARD_STATUS.DISABLE,
        cardIndex: currentCard?.cardIndex,
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await changeStatus(payload);
    deleteCardSheetRef.current.hide();
    switch (apiResponse?.status?.type) {
      case ApiResponseStatusType.SUCCESS:
        navigate(ScreenNames.CARDS);
        renderToast(localizationText.CARD_OPTIONS.CARD_HAS_BEEN_DELETED, true, icons.trash, true);
        break;
      case apiResponse?.apiResponseNotOk:
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
        break;
      case ApiResponseStatusType.FAILURE:
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
        break;
      default:
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
        break;
    }
  };

  const onConfirmDeleteCard = () => {
    stopCard();
  };
  const showDeleteCardSheet = () => {
    deleteCardSheetRef.current.show();
  };

  const onClickDeleteCardSheet = useCallback((index: number) => {
    switch (index) {
      case 0:
        deleteCardSheetRef.current.hide();
        break;
      case 1:
        onConfirmDeleteCard();
        break;
      default:
        break;
    }
  }, []);

  const onNavigateToChooseAddress = () => {
    navigate(ScreenNames.REPLACE_CARD_CHOOSE_ADDRESS, { currentCard });
  };

  const onNavigateToSuccess = (pin: string) => {
    setPin(pin);
    onCloseBottomSheet();
    prepareOtp(true);
  };

  const isExist = (checkStr: string | undefined) => checkStr || '';

  const resetPassCode = async () => {
    try {
      const payload: resetPinCodeProp = {
        walletNumber,
        cardIndex: currentCard?.cardIndex,
        body: {
          cardPinCode:
            encryptData(
              isExist(appData?.encryptionData?.passwordEncryptionPrefix) + pin,
              isExist(appData?.encryptionData?.passwordEncryptionKey),
            ) || '',
          otp: otp,
          otpRef: otpRef,
          deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
        },
      };
      const apiResponse: any = await resetPinCode(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          otpVerificationRef?.current?.resetInterval();
          setOtpSheetVisible(false);
          navigate(ScreenNames.CHANGE_PIN_SUCCESS, { currentCard });
          break;
        case apiResponse?.apiResponseNotOk:
          renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
          break;
        case ApiResponseStatusType.FAILURE:
          renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
          break;
        default:
          renderToast(localizationText.ERROR.API_ERROR_RESPONSE, false, icons.warning, false);
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(localizationText.ERROR.SOMETHING_WENT_WRONG, false, icons.warning, false);
    }
  };

  function onOtpCloseBottomSheet(): void {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
  }

  function onConfirmOtp(): void {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      resetPassCode();
    }
  }

  function handleOnPressHelp(): void {
    helpCenterRef?.current?.present();
  }

  const onResendCodePress = () => {
    prepareOtp(false);
  };

  const prepareOtp = async (showOtpSheet: boolean = true) => {
    const payload: resetPinCodeProp = {
      walletNumber: walletNumber,
      cardIndex: currentCard?.cardIndex,
      body: {
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await prepareResetCardPinCode(payload);

    otpVerificationRef?.current?.resetInterval();
    if (apiResponse.status.type === 'SUCCESS') {
      setOtpRef(apiResponse?.response?.otpRef as string);
      if (showOtpSheet) {
        setOtpSheetVisible(true);
        otpVerificationRef?.current?.present();
      }
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_OPTIONS.CARD_OPTIONS} backBtn applyFlex />
      <IPayScrollView style={styles.scrollView}>
        <IPayView>
          <IPayCardDetails
            cardType={cardType}
            cardTypeName={cardHeaderText}
            carHolderName={name}
            cardLastFourDigit={maskedCardNumber || ''}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.CARD_OPTIONS.CARD_SERVICES} />

          <IPayCardOptionsIPayListDescription
            leftIcon={icons.LOCK}
            rightIcon={icons.edit_2}
            title={localizationText.CARD_OPTIONS.PIN_CODE}
            subTitle={localizationText.CARD_OPTIONS.FOUR_DIGIT_PIN}
            detailText={localizationText.CARD_OPTIONS.CHANGE}
            onPress={() => {
              openBottomSheet.current?.present();
            }}
          />

          <IPayCardOptionsIPayListDescription
            leftIcon={icons.task}
            rightIcon={icons.arrow_right_1}
            title={localizationText.CARD_OPTIONS.CARD_FEATURES}
            subTitle={localizationText.CARD_OPTIONS.LEARN_MORE_ABOUT_FEATURE}
            onPress={() => navigate(ScreenNames.CARD_FEATURES, { currentCard })}
          />

          <IPayCardOptionsIPayListDescription
            leftIcon={icons.card_pos}
            rightIcon={icons.arrow_right_1}
            title={localizationText.CARD_OPTIONS.REPLACE_THE_CARD}
            subTitle={localizationText.CARD_OPTIONS.CARD_REPLACEMENT_INCLUDES}
            onPress={onNavigateToChooseAddress}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.CARD_OPTIONS.CARD_CONTROLS} />
          {currentCard?.cardStatus != '850' && (
            <IPayCardOptionsIPayListToggle
              leftIcon={icons.receipt_item}
              title={
                isOnlinePurchase
                  ? localizationText.CARD_OPTIONS.DE_ACTIVATE_ONLINE_PURCHASE
                  : localizationText.CARD_OPTIONS.ACTIVATE_ONLINE_PURCHASE
              }
              onToggleChange={toggleOnlinePurchase}
              toggleState={isOnlinePurchase}
            />
          )}

          <IPayCardOptionsIPayListToggle
            leftIcon={icons.moneys}
            title={localizationText.CARD_OPTIONS.WITHDRAW_CASH_FROM}
            onToggleChange={toggleATMWithdraw}
            toggleState={isATMWithDraw}
          />
          <IPayView style={styles.deleteButtonStyle}>
            <IPayList
              onPress={showDeleteCardSheet}
              isShowLeftIcon
              leftIcon={<IPayIcon icon={icons.trash} size={24} color={colors.natural.natural700} />}
              title={localizationText.CARD_OPTIONS.DELETE_THE_CARD}
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>
      <IPayBottomSheet
        simpleBar
        heading={localizationText.CHANGE_PIN.CHANGE_PIN_CODE}
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['1%', '98%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={openBottomSheet}
      >
        <IPayChangeCardPin onSuccess={onNavigateToSuccess} currentCard={currentCard} />
      </IPayBottomSheet>
      <IPayActionSheet
        ref={deleteCardSheetRef}
        testID="delete-card-action-sheet"
        title={localizationText.CARD_OPTIONS.DELETE_THE_CARD}
        message={localizationText.CARD_OPTIONS.YOU_WONT_BE_ABLE_TO_USE}
        options={[localizationText.COMMON.CANCEL, localizationText.CARD_OPTIONS.DELETE]}
        cancelButtonIndex={0}
        destructiveButtonIndex={1}
        showIcon
        showCancel
        customImage={<IPayIcon icon={icons.TRASH} size={48} />}
        onPress={onClickDeleteCardSheet}
        bodyStyle={styles.bottomMarginStyles}
      />

      <IPayPortalBottomSheet
        heading={localizationText.CARD_OPTIONS.CHANGE_PIN}
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

export default CardOptionsScreen;
