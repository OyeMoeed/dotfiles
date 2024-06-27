import { IPayCheckbox, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';

import { Login } from '@app/assets/svgs';
import { IPayAnimatedTextInput, IPayButton, IPayHeader, IPayPageDescriptionText } from '@app/components/molecules';
import IPayToast from '@app/components/molecules/ipay-toast/ipay-toast.component';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate, setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import { MobileAndIqamaVerificationProps } from './mobile-and-iqama-verification.interface';
import mobileAndIqamaStyles from './mobile-and-iqama-verification.style';
import { scaleSize } from '@app/styles/mixins';

const MobileAndIqamaVerification: React.FC<MobileAndIqamaVerificationProps> = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [iqamaId, setIqamaId] = useState<string>('');
  const [mobileNumberErrorMsg, setMobileNumberErrorMsg] = useState<string>('');
  const [iqamaIdErrorMsg, setIqamaIdErrorMsg] = useState<string>('');
  const styles = mobileAndIqamaStyles(colors);
  const localizationText = useLocalization();

  const bottomSheetRef = useRef<any>(null);
  const otpVerificationRef = useRef<any>(null);
  const termsAndConditionSheetRef = useRef<any>(null);

  const [showError, setShowError] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');

  useEffect(() => {
    setTopLevelNavigator(navigation);
  }, [navigation]);

  const onCloseBottomSheet = () => {
    otpVerificationRef.current?.resetInterval();
  };

  const openBottomSheet = () => {
    onCloseBottomSheet();
    bottomSheetRef.current?.present();
  };

  const onPressConfirm = () => {
    onCloseBottomSheet();
    bottomSheetRef.current?.close();
    navigate(screenNames.SET_PASSCODE);
  };

  const onMobileNumberChangeText = (text: string) => {
    setMobileNumber(text);
    if (mobileNumberErrorMsg !== '') setMobileNumberErrorMsg('');
  };

  const onIqamaIdChnageText = (text: string) => {
    setIqamaId(text);
    if (iqamaIdErrorMsg !== '') setIqamaIdErrorMsg('');
  };

  const onPressCallback = () => {
    if (mobileNumberErrorMsg !== '') setMobileNumberErrorMsg('');
    if (iqamaIdErrorMsg !== '') setIqamaIdErrorMsg('');
  };

  const renderToast = () => (
    <IPayToast
      testID="error-message-toast"
      title={errorTitle}
      isShowSubTitle
      subTitle={localizationText.verify_number_accuracy}
      borderColor={colors.error.error25}
      isShowLeftIcon
      viewText=""
      leftIcon={<IPayIcon icon={icons.warning} size={scaleSize(20)} color={colors.natural.natural0} />}
      onPress={() => onPressCallback}
      containerStyle={styles.toast}
    />
  );

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  const onSubmit = () => {
    let isError = false;
    if (mobileNumber == '') {
      setErrorTitle(localizationText.incorrect_mobile_number);
      setMobileNumberErrorMsg(localizationText.incorrect_mobile_number);
      isError = true;
    }
    if (iqamaId == '') {
      setErrorTitle(localizationText.incorrect_id_iqama_number);
      setIqamaIdErrorMsg(localizationText.incorrect_id_iqama_number);
      isError = true;
    }
    if (isError) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false)
      },2000)
    } else {
      openBottomSheet();
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader languageBtn />
      <IPayView style={styles.container}>
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
            />
          </IPayView>
        </IPayView>

        <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsAndConditionsParentView}>
          <IPayView style={styles.termsAndConditionsView}>
            <IPayCheckbox />
            <IPayFootnoteText style={styles.termAndConditionsText} text={localizationText.terms_and_conditions_text} />
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

        {showError && renderToast()}
      </IPayView>
      <IPayButton
        onPress={() => {
          navigate(screenNames.LOGIN_VIA_PASSCODE);
        }}
        btnType="link-button"
        btnText={localizationText.need_help}
        large
        btnStyle={styles.needHelpBtn}
        rightIcon={<IPayIcon icon={icons.message_question_help} size={20} color={colors.primary.primary500} />}
      />
      <IPayBottomSheet
        heading={localizationText.login}
        enablePanDownToClose
        simpleBar
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={bottomSheetRef}
        bold
      >
        <IPayOtpVerification ref={otpVerificationRef} onPressConfirm={onPressConfirm} />
      </IPayBottomSheet>

      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
    </IPaySafeAreaView>
  );
};

export default MobileAndIqamaVerification;
