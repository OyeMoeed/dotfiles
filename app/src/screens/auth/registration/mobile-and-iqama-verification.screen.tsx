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
import { LoginUserPayloadProps } from '@app/network/services/api/auth/auth.type';
import loginUser from '@app/network/services/authentication/login/login.service';
import { encryptVariable } from '@app/network/utilities/encryption-helper';
import { useTypedSelector } from '@app/store/store';
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
  const [mobileNumberErrorMsg, setMobileNumberErrorMsg] = useState<string>('');
  const [iqamaIdErrorMsg, setIqamaIdErrorMsg] = useState<string>('');
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginReqData, setLoginReqData] = useState<object[] | null>(null);
  const styles = mobileAndIqamaStyles(colors);
  const localizationText = useLocalization();
  const bottomSheetRef = useRef(null);
  const termsAndConditionSheetRef = useRef(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);

  const { showToast } = useToastContext();
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  const [showError, setShowError] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    setTopLevelNavigator(navigation);
  }, []);

  const onCloseBottomSheet = () => {
    otpVerificationRef.current?.resetInterval();
  };

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg || localizationText.api_request_failed,
      subTitle: apiError || localizationText.please_verify_number_accuracy,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const onPressConfirm = () => {
    onCloseBottomSheet();
    bottomSheetRef.current?.close();
    if (loginReqData?.newMember) {
      navigate(screenNames.SET_PASSCODE);
    } else {
      resetNavigation(screenNames.LOGIN_VIA_PASSCODE);
    }
  };

  const redirectToOtp = () => {
    setIsLoading(false);
    onCloseBottomSheet();
    bottomSheetRef.current?.present();
  };

  const checkIfUserExists = async () => {
    setIsLoading(true);
    try {
      const payload: LoginUserPayloadProps = {
        username: encryptVariable({
          veriable: mobileNumber.toString(),
          encryptionKey: appData?.encryptionData?.passwordEncryptionKey,
          encryptionPrefix: appData?.encryptVariable?.encryptionPrefix,
        }),
        poi: encryptVariable({
          veriable: iqamaId.toString(),
          encryptionKey: appData?.encryptionData?.passwordEncryptionKey,
          encryptionPrefix: appData?.encryptVariable?.encryptionPrefix,
        }),
        authentication: appData.transactionId,
        deviceInfo: appData.deviceInfo,
      };

      const apiResponse = await loginUser(payload);
      if (apiResponse.ok) {
        setLoginReqData(apiResponse?.data?.response);
        redirectToOtp();
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.api_response_error);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.something_went_wrong);
      renderToast(error?.message || localizationText.something_went_wrong);
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
      setMobileNumberErrorMsg(localizationText.please_enter_mobile_number);
      renderToast(localizationText.please_enter_mobile_number);
    }
    if (iqamaId === '' || iqamaId.length < constants.IQAMA_ID_NUMBER_LENGTH) {
      setIqamaIdErrorMsg(localizationText.please_enter_iqama_id);
      renderToast(localizationText.please_enter_iqama_id);
    }

    if (
      (mobileNumber && iqamaId) !== '' &&
      mobileNumber.length === constants.MOBILE_NUMBER_LENGTH &&
      iqamaId.length === constants.IQAMA_ID_NUMBER_LENGTH
    ) {
      checkIfUserExists();
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
              heading={localizationText.enter_information}
              text={localizationText.enter_valid_id_or_iqama}
            />
          </IPayView>

          <IPayView style={styles.inputFieldsContainer}>
            <IPayAnimatedTextInput
              label={localizationText.mobile_number}
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
                label={localizationText.id_iqama}
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
              <IPayCheckbox />
              <IPayFootnoteText
                style={styles.termAndConditionsText}
                text={localizationText.terms_and_conditions_text}
              />
              <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
            </IPayView>
          </IPayPressable>

          <IPayButton
            onPress={() => {
              onSubmit();
            }}
            btnType="primary"
            btnText={localizationText.next}
            large
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
          />
        </IPayScrollView>
      </IPayView>

      {!keyboardVisible && (
        <IPayButton
          onPress={handleOnPressHelp}
          btnType="link-button"
          btnText={localizationText.need_help}
          large
          btnStyle={styles.needHelpBtn}
          rightIcon={<IPayIcon icon={icons.message_question_help} size={20} color={colors.primary.primary500} />}
        />
      )}
      <IPayBottomSheet
        heading={localizationText.login}
        enablePanDownToClose
        simpleBar
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={bottomSheetRef}
        bold
      >
        <IPayOtpVerification ref={otpVerificationRef} onPressConfirm={onPressConfirm} mobileNumber={''} iqamaId={''} />
      </IPayBottomSheet>

      <IPayBottomSheet
        heading={localizationText.help_center}
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
