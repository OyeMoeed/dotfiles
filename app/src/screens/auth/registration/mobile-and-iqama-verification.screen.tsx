import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';

import { Login } from '@app/assets/svgs';
import { IPayAnimatedTextInput, IPayButton, IPayHeader, IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate, resetNavigation, setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setToken } from '@app/network/client';
import { LoginUserPayloadProps } from '@app/network/services/authentication/login/login.interface';
import loginUser from '@app/network/services/authentication/login/login.service';
import prepareLogin from '@app/network/services/authentication/prepare-login/prepare-login.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import icons from '@assets/icons/index';
import { ActivityIndicator, Keyboard } from 'react-native';
import HelpCenterComponent from '../forgot-passcode/help-center.component';
import { MobileAndIqamaVerificationProps } from './mobile-and-iqama-verification.interface';
import mobileAndIqamaStyles from './mobile-and-iqama-verification.style';

const MobileAndIqamaVerification: React.FC<MobileAndIqamaVerificationProps> = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [iqamaId, setIqamaId] = useState<string>('');
  const [otpRef, setOtpRef] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [mobileNumberErrorMsg, setMobileNumberErrorMsg] = useState<string>('');
  const [iqamaIdErrorMsg, setIqamaIdErrorMsg] = useState<string>('');
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const styles = mobileAndIqamaStyles(colors);
  const localizationText = useLocalization();
  const bottomSheetRef = useRef(null);
  const termsAndConditionSheetRef = useRef(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);

  const { showToast } = useToastContext();
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    setTopLevelNavigator(navigation);
  }, []);

  const onCloseBottomSheet = () => {
    otpVerificationRef.current?.resetInterval();
  };

  const renderToast = (toastMsg: string, hideSubtitle?: boolean) => {
    showToast({
      title: toastMsg || localizationText.api_request_failed,
      subTitle: !hideSubtitle ? apiError || localizationText.CARDS.VERIFY_CODE_ACCURACY : '',
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const onPressConfirm = (isNewMember: boolean) => {
    onCloseBottomSheet();
    bottomSheetRef.current?.close();
    requestAnimationFrame(() => {
      if (isNewMember) {
        navigate(screenNames.SET_PASSCODE);
      } else {
        resetNavigation(screenNames.LOGIN_VIA_PASSCODE);
      }
    });
  };

  const redirectToOtp = () => {
    setIsLoading(false);
    onCloseBottomSheet();
    bottomSheetRef.current?.present();
  };

  const prepareTheLoginService = async () => {
    const deviceInfo = await getDeviceInfo();
    const apiResponse = await prepareLogin();
    if (apiResponse.status.type == 'SUCCESS') {
      dispatch(
        setAppData({
          transactionId: apiResponse?.authentication?.transactionId,
          encryptionData: apiResponse?.response,
          deviceInfo,
          authentication: apiResponse?.headers?.authorization,
          mobileNumber: mobileNumber.toString(),
          poiNumber: iqamaId.toString(),
        }),
      );
      setToken(apiResponse?.headers?.authorization);
      await checkIfUserExists(apiResponse, deviceInfo);
    }
  };
  const checkIfUserExists = async (prepareResponse: any, deviceInfo) => {
    setIsLoading(true);
    try {
      const payload: LoginUserPayloadProps = {
        username: encryptData(
          `${prepareResponse.response.passwordEncryptionPrefix}${mobileNumber.toString()}`,
          prepareResponse.response.passwordEncryptionKey,
        ),
        poi: encryptData(
          `${prepareResponse.response.passwordEncryptionPrefix}${iqamaId.toString()}`,
          prepareResponse.response.passwordEncryptionKey,
        ),
        authentication: { transactionId: prepareResponse.authentication.transactionId },
        deviceInfo: deviceInfo,
      };

      const apiResponse = await loginUser(payload);
      if (apiResponse.status.type == 'SUCCESS') {
        setTransactionId(prepareResponse.authentication.transactionId);
        if (apiResponse?.response?.otpRef) {
          setOtpRef(apiResponse?.response?.otpRef);
        }
        redirectToOtp();
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const onMobileNumberChangeText = (text: string) => {
    const reg = regex.NUMBERS_ONLY; // Matches an empty string or any number of digits
    if (reg.test(text)) {
      setMobileNumber(text);
    }
    if (mobileNumberErrorMsg !== '') setMobileNumberErrorMsg('');
  };

  const onIqamaIdChnageText = (text: string) => {
    setIqamaId(text);
    if (iqamaIdErrorMsg !== '') setIqamaIdErrorMsg('');
  };

  const validator = () => {
    if (mobileNumber === '' || mobileNumber.length < constants.MOBILE_NUMBER_LENGTH) {
      setMobileNumberErrorMsg(localizationText.COMMON.ENTER_PHONE_NUMBER);
      renderToast(localizationText.COMMON.ENTER_PHONE_NUMBER);
    }
    if (iqamaId === '' || iqamaId.length < constants.IQAMA_ID_NUMBER_LENGTH) {
      setIqamaIdErrorMsg(localizationText.COMMON.ENTER_IQAMA_ID);
      renderToast(localizationText.COMMON.ENTER_IQAMA_ID);
    }

    if (!checkTermsAndConditions) {
      renderToast(localizationText.COMMON.TERMS_AND_CONDITIONS_VALIDATION, true);
    }

    if (
      (mobileNumber && iqamaId) !== '' &&
      mobileNumber.length === constants.MOBILE_NUMBER_LENGTH &&
      iqamaId.length === constants.IQAMA_ID_NUMBER_LENGTH &&
      checkTermsAndConditions
    ) {
      prepareTheLoginService();
    }
  };

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  const onSubmit = () => {
    validator();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onCheckTermsAndConditions = () => {
    setCheckTermsAndConditions(!checkTermsAndConditions);
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader languageBtn />
      <IPayView style={styles.container}>
        {isLoading && <ActivityIndicator color={colors.primary.primary500} />}

        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView style={styles.loginIconView}>
            <Login />
          </IPayView>
          <IPayView style={styles.headingView}>
            <IPayPageDescriptionText
              heading={localizationText.COMMON.ENTER_INFORMATION}
              text={localizationText.COMMON.ENTER_VALID_ID_OR_IQAMA}
            />
          </IPayView>

          <IPayView style={styles.inputFieldsContainer}>
            <IPayAnimatedTextInput
              label={localizationText.PROFILE.MOBILE_NUMBER}
              editable
              isError={mobileNumberErrorMsg !== ''}
              assistiveText={mobileNumberErrorMsg}
              value={mobileNumber}
              onChangeText={onMobileNumberChangeText}
              keyboardType="phone-pad"
              maxLength={constants.MOBILE_NUMBER_LENGTH}
            />
            <IPayView style={styles.inputTextView}>
              <IPayAnimatedTextInput
                label={localizationText.COMMON.ID_IQAMA}
                editable
                isError={iqamaIdErrorMsg !== ''}
                assistiveText={iqamaIdErrorMsg}
                value={iqamaId}
                onChangeText={onIqamaIdChnageText}
                keyboardType="number-pad"
                maxLength={constants.IQAMA_ID_NUMBER_LENGTH}
              />
            </IPayView>
          </IPayView>

          <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsAndConditionsParentView}>
            <IPayView style={styles.termsAndConditionsView}>
              <IPayCheckbox onPress={onCheckTermsAndConditions} isCheck={checkTermsAndConditions} />
              <IPayFootnoteText
                style={styles.termAndConditionsText}
                text={localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT}
              />
              <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
            </IPayView>
          </IPayPressable>

          <IPayButton
            onPress={() => {
              onSubmit();
            }}
            btnType="primary"
            btnText={localizationText.COMMON.NEXT}
            large
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
          />
        </IPayScrollView>
      </IPayView>

      {!keyboardVisible && (
        <IPayButton
          onPress={handleOnPressHelp}
          btnType="link-button"
          btnText={localizationText.COMMON.NEED_HELP}
          large
          btnStyle={styles.needHelpBtn}
          rightIcon={<IPayIcon icon={icons.message_question_help} size={20} color={colors.primary.primary500} />}
        />
      )}
      <IPayBottomSheet
        heading={localizationText.COMMON.LOGIN}
        enablePanDownToClose
        simpleBar
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={bottomSheetRef}
        bold
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={onPressConfirm}
          mobileNumber={mobileNumber}
          iqamaId={iqamaId}
          otpRef={otpRef}
          transactionId={transactionId}
        />
      </IPayBottomSheet>

      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '100%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>

      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
    </IPaySafeAreaView>
  );
};

export default MobileAndIqamaVerification;
