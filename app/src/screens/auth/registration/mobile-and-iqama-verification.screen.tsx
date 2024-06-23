import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IPayCheckbox, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';

import { IPayAnimatedTextInput, IPayButton, IPayHeader, IPayPageDescriptionText } from '@app/components/molecules';
import IPayToast from '@app/components/molecules/ipay-toast/ipay-toast.component';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate, setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import mobileAndIqamaStyles from './mobile-and-iqama-verification.style';
import { MobileAndIqamaVerificationProps } from './mobile-and-iqama-verification.interface';
import { Login } from '@app/assets/svgs';


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

  const renderToast = () =>
    (mobileNumberErrorMsg !== '' || iqamaIdErrorMsg !== '') && (
      <IPayToast
        testID="error-message-toast"
        title={localizationText.show_error_toast}
        isShowSubTitle
        subTitle={localizationText.verify_number_accuracy}
        borderColor={colors.error.error25}
        isShowLeftIcon
        viewText=""
        isShowRightIcon
        rightIcon={<IPayIcon icon={icons.crossIcon} size={18} color={colors.primary.primary500} />}
        leftIcon={<IPayIcon icon={icons.warning} size={24} />}
        onPress={() => onPressCallback}
        containerStyle={styles.toast}
      />
    );

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
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
          />
          <IPayView style={styles.inputTextView}>
            <IPayAnimatedTextInput
              label={localizationText.id_iqama}
              editable
              isError={iqamaIdErrorMsg !== ''}
              assistiveText={iqamaIdErrorMsg}
              value={iqamaId}
              onChangeText={onIqamaIdChnageText}
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
            openBottomSheet();
          }}
          btnType="primary"
          btnText={localizationText.next}
          large
          rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
        />

    
        {renderToast()}
      
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
