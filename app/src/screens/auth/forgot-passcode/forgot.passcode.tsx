import { IPayView } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import { IPayAnimatedTextInput, IPayButton, IPayPageDescriptionText } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';

import useTheme from '@app/styles/hooks/theme.hook';
import { useNavigation } from '@react-navigation/native';
import { forwardRef, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import  ForgotPasscodeStyles  from './forgot.passcode.styles';
import IPayToast from '@app/components/molecules/ipay-toast/ipay-toast.component';
import screenNames from '@app/navigation/screen-names.navigation';

const ForgotPasscodeBottomSheet = forwardRef((props, ref) => {
  const { colors, icons } = useTheme();
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeErrorMsg, setPasscodeErrorMsg] = useState<string>('');
  const correctPasscode = '1234'; // Replace with your correct passcode
  const styles = ForgotPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation();

  const onPressConfirm = () => {
    if (passcode === correctPasscode) {
      navigation.navigate(screenNames.SET_PASSCODE);
    } else {
      setPasscodeErrorMsg(localizationText.incorrect_number);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  const onPasscodeChangeText = (text: string) => {
    setPasscode(text);
    setPasscodeErrorMsg(''); // Reset error message on text change
  };

  const renderToast = () => {
    return (
      showToast && (
        <IPayToast
          testID="hideBalanceToast"
          title={localizationText.incorrect_iqama}
          subTitle={localizationText.verify_iqama}
          isShowSubTitle
          isShowButton={true}
          borderColor={colors.primary.primary700}
          isShowLeftIcon={true}
          leftIcon={<icons.warning2 />}
          viewText=""
          onPress={() => setShowToast(false)}
          containerStyle={styles.toast}

        />
      )
    );
  };

  return (
    <IPaySafeAreaView>
      <IPayScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <IPayView style={styles.loginIconView}>
          <icons.userTick />
        </IPayView>

        <IPayView style={styles.headingView}>
          <IPayPageDescriptionText
            heading={localizationText.forgot_passcode_heading}
            text={localizationText.forgot_passcode_subtitle}
          />
        </IPayView>

        <IPayView style={styles.inputFieldsContainer}>
          <IPayView style={styles.inputTextView}>
            <IPayAnimatedTextInput
              label={localizationText.id_iqama}
              editable
              isError={!!passcodeErrorMsg}
              assistiveText={passcodeErrorMsg}
              value={passcode}
              onChangeText={onPasscodeChangeText}
            />
          </IPayView>
        </IPayView>

        <IPayButton
          onPress={onPressConfirm}
          btnType="primary"
          btnText={localizationText.next}
          large
          rightIcon={<icons.arrowRight color={colors.natural.natural0} width={scale(20)} height={verticalScale(20)} />}
        />

        <IPayButton
          onPress={() => navigate(screenNames.REGISTRATION_SUCCESSFUL)}
          btnType="link-button"
          btnText={localizationText.need_help}
          large
          btnStyle={styles.needHelpBtn}
          rightIcon={<icons.messageQuestion width={scale(20)} height={verticalScale(20)} />}
        />
      </IPayScrollView>
      {renderToast()}
    </IPaySafeAreaView>
  );
});

export default ForgotPasscodeBottomSheet;
