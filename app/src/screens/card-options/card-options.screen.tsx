import React, { useCallback, useEffect, useRef, useState } from 'react';

import icons from '@app/assets/icons';
import IPayCardDetails from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import constants, { SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';

import { IPayFootnoteText, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayList } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet } from '@app/components/organism';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { ApiResponseStatusType, spinnerVariant, ToastTypes } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { IPayOtpVerification, IPaySafeAreaView } from '@components/templates';
import { RouteProp, useRoute } from '@react-navigation/native';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { useTypedSelector } from '@app/store/store';
import useConstantData from '@app/constants/use-constants';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import {
  CardStatus,
  changeStatusProp,
  resetPinCodeProp,
} from '@app/network/services/core/transaction/transaction.interface';
import {
  changeStatus,
  prepareResetCardPinCode,
  resetPinCode,
} from '@app/network/services/core/transaction/transactions.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo, encryptData } from '@app/network/utilities';
import { useTranslation } from 'react-i18next';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import cardOptionsStyles from './card-options.style';
import { ChangePinRefTypes, DeleteCardSheetRefTypes, RouteParams } from './card-options.interface';
import IPayCardOptionsIPayListToggle from './card-options-ipaylist-toggle';
import IPayCardOptionsIPayListDescription from './card-options-ipaylist-description';
import IPayChangeCardPin from '../change-card-pin/change-card-pin.screens';

const CardOptionsScreen: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const {
    currentCard,
    currentCard: { cardType, cardHeaderText, name, maskedCardNumber },
  } = route.params;

  const changePinRef = useRef<ChangePinRefTypes>(null);
  const openBottomSheet = useRef<bottomSheetTypes>(null);
  const deleteCardSheetRef = useRef<DeleteCardSheetRefTypes>({
    hide() {},
    show() {},
  });

  const { t } = useTranslation();
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
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const helpCenterRef = useRef(null);
  const [otpRef, setOtpRef] = useState<string>('');
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [pin, setPin] = useState('');

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

  const initOnlinePurchase = () => {
    if (currentCard.cardStatus === CardStatus.ONLINE_PURCHASE_ENABLE) {
      // check if online purchase is enabled
      setIsOnlinePurchase(true);
    } else {
      setIsOnlinePurchase(false);
    }
  };

  useEffect(() => {
    initOnlinePurchase();
  }, []);

  const getToastSubTitle = () =>
    `${cardType} ${cardHeaderText}  - *** ${constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}`;

  const renderToast = (title: string, isOn: boolean, icon: string, isFromDelete: boolean) => {
    showToast({
      title,
      subTitle: getToastSubTitle(),
      containerStyle: isFromDelete ? styles.isFromDeleteStyle : styles.toastContainerStyle,
      leftIcon: <IPayIcon icon={icon} size={24} color={colors.natural.natural0} />,
      toastType: isOn ? ToastTypes.SUCCESS : ToastTypes.WARNING,
    });
  };

  const changeOnlinePurchase = async (isOn?: boolean, newStatus?: string) => {
    renderSpinner(true);
    const payload: changeStatusProp = {
      walletNumber,
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
          isOn ? t('CARD_OPTIONS.ONLINE_PURCHASE_ENABLED') : t('CARD_OPTIONS.ONLINE_PURCHASE_DISABLED'),
          isOn || true,
          icons.receipt_item,
          false,
        );
        break;
      case apiResponse?.apiResponseNotOk:
        renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
        break;
      case ApiResponseStatusType.FAILURE:
        renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
        break;
      default:
        renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
        break;
    }
    renderSpinner(false);
  };

  const toggleOnlinePurchase = () => {
    if (currentCard?.cardStatus === CardStatus.ONLINE_PURCHASE_DISABLE) {
      changeOnlinePurchase(true, CardStatus.ONLINE_PURCHASE_ENABLE);
    } else if (currentCard?.cardStatus === CardStatus.ONLINE_PURCHASE_ENABLE) {
      changeOnlinePurchase(false, CardStatus.ONLINE_PURCHASE_DISABLE);
    }
  };

  const toggleATMWithdraw = (isOn: boolean) => {
    setIsATMWithDraw((prev) => !prev);
    renderToast(
      isOn ? t('CARD_OPTIONS.ATM_WITHDRAW_ENABLED') : t('CARD_OPTIONS.ATM_WITHDRAW_DISABLED'),
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
    renderSpinner(true);
    const payload: changeStatusProp = {
      walletNumber,
      body: {
        status: CardStatus.DISABLE,
        cardIndex: currentCard?.cardIndex,
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await changeStatus(payload);
    deleteCardSheetRef.current.hide();
    switch (apiResponse?.status?.type) {
      case ApiResponseStatusType.SUCCESS:
        navigate(ScreenNames.CARDS);
        renderToast(t('CARD_OPTIONS.CARD_HAS_BEEN_DELETED'), true, icons.trash, true);
        break;
      case apiResponse?.apiResponseNotOk:
        renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
        break;
      case ApiResponseStatusType.FAILURE:
        renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
        break;
      default:
        renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
        break;
    }
    renderSpinner(false);
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

  const isExist = (checkStr: string | undefined) => checkStr || '';

  const resetPassCode = async () => {
    renderSpinner(true);
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
          otp,
          otpRef,
          deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
        },
      };
      const apiResponse: any = await resetPinCode(payload);
      renderSpinner(false);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          otpVerificationRef?.current?.resetInterval();
          setOtpSheetVisible(false);
          navigate(ScreenNames.CHANGE_PIN_SUCCESS, { currentCard });
          break;
        case apiResponse?.apiResponseNotOk:
          renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
          break;
        case ApiResponseStatusType.FAILURE:
          renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
          break;
        default:
          renderToast(t('ERROR.API_ERROR_RESPONSE'), false, icons.warning, false);
          break;
      }

      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      renderToast(t('ERROR.SOMETHING_WENT_WRONG'), false, icons.warning, false);
    }
  };

  const onOtpCloseBottomSheet = (): void => {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
  };

  const onConfirmOtp = (): void => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    } else {
      resetPassCode();
    }
  };

  const handleOnPressHelp = (): void => {
    helpCenterRef?.current?.present();
  };

  const prepareOtp = async (showOtpSheet: boolean = true) => {
    renderSpinner(true);
    const payload: resetPinCodeProp = {
      walletNumber,
      cardIndex: currentCard?.cardIndex,
      body: {
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await prepareResetCardPinCode(payload);

    otpVerificationRef?.current?.resetInterval();
    renderSpinner(false);
    if (apiResponse.status.type === 'SUCCESS') {
      setOtpRef(apiResponse?.response?.otpRef as string);
      if (showOtpSheet) {
        setOtpSheetVisible(true);
        otpVerificationRef?.current?.present();
      }
    }
  };

  const onNavigateToSuccess = (pinValue: string) => {
    setPin(pinValue);
    onCloseBottomSheet();
    prepareOtp(true);
  };

  const onResendCodePress = () => {
    prepareOtp(false);
  };

  useEffect(() => {
    if (isOtpSheetVisible) {
      setOtp('');
    }
  }, [isOtpSheetVisible]);

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title="CARD_OPTIONS.CARD_OPTIONS" backBtn applyFlex />
      <IPayScrollView style={styles.scrollView}>
        <IPayView>
          <IPayCardDetails
            cardType={cardType}
            cardTypeName={cardHeaderText}
            carHolderName={name}
            cardLastFourDigit={maskedCardNumber || ''}
          />

          <IPayFootnoteText style={styles.listTitleText} text="CARD_OPTIONS.CARD_SERVICES" />

          <IPayCardOptionsIPayListDescription
            leftIcon={icons.LOCK}
            rightIcon={icons.edit_2}
            title="CARD_OPTIONS.PIN_CODE"
            subTitle="CARD_OPTIONS.FOUR_DIGIT_PIN"
            detailText="CARD_OPTIONS.CHANGE"
            onPress={() => {
              openBottomSheet.current?.present();
            }}
          />

          <IPayCardOptionsIPayListDescription
            leftIcon={icons.task}
            rightIcon={icons.arrow_right_1}
            title="CARD_OPTIONS.CARD_FEATURES"
            subTitle="CARD_OPTIONS.LEARN_MORE_ABOUT_FEATURE"
            onPress={() => navigate(ScreenNames.CARD_FEATURES, { currentCard })}
          />

          <IPayCardOptionsIPayListDescription
            leftIcon={icons.card_pos}
            rightIcon={icons.arrow_right_1}
            title="CARD_OPTIONS.REPLACE_THE_CARD"
            subTitle="CARD_OPTIONS.CARD_REPLACEMENT_INCLUDES"
            onPress={onNavigateToChooseAddress}
          />

          <IPayFootnoteText style={styles.listTitleText} text="CARD_OPTIONS.CARD_CONTROLS" />
          {currentCard?.cardStatus !== '850' && (
            <IPayCardOptionsIPayListToggle
              leftIcon={icons.receipt_item}
              title={
                isOnlinePurchase
                  ? t('CARD_OPTIONS.DE_ACTIVATE_ONLINE_PURCHASE')
                  : t('CARD_OPTIONS.ACTIVATE_ONLINE_PURCHASE')
              }
              onToggleChange={toggleOnlinePurchase}
              toggleState={isOnlinePurchase}
            />
          )}

          <IPayCardOptionsIPayListToggle
            leftIcon={icons.moneys}
            title="CARD_OPTIONS.WITHDRAW_CASH_FROM"
            onToggleChange={toggleATMWithdraw}
            toggleState={isATMWithDraw}
          />
          <IPayView style={styles.deleteButtonStyle}>
            <IPayList
              onPress={showDeleteCardSheet}
              isShowLeftIcon
              leftIcon={<IPayIcon icon={icons.trash} size={24} color={colors.natural.natural700} />}
              title="CARD_OPTIONS.DELETE_THE_CARD"
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>
      <IPayBottomSheet
        simpleBar
        heading="CHANGE_PIN.CHANGE_PIN_CODE"
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
        title="CARD_OPTIONS.DELETE_THE_CARD"
        message="CARD_OPTIONS.YOU_WONT_BE_ABLE_TO_USE"
        options={[t('COMMON.CANCEL'), t('CARD_OPTIONS.DELETE]')]}
        cancelButtonIndex={0}
        destructiveButtonIndex={1}
        showIcon
        showCancel
        customImage={<IPayIcon icon={icons.TRASH} size={48} />}
        onPress={onClickDeleteCardSheet}
        bodyStyle={styles.bottomMarginStyles}
      />

      <IPayPortalBottomSheet
        heading="CARD_OPTIONS.CHANGE_PIN"
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
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.transaction.otpTimeout}
          onResendCodePress={onResendCodePress}
          otp={otp}
        />
      </IPayPortalBottomSheet>

      <IPayBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
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
