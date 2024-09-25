import { IPayIcon, IPayView } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import { IPayAnimatedTextInput, IPayButton, IPayPageDescriptionText } from '@app/components/molecules';
import IPayToast from '@app/components/molecules/ipay-toast/ipay-toast.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { buttonVariants } from '@app/utilities';
import ForgotPasscodeStyles from './forgot.passcode.styles';

const ForgotPasscodeBottomSheet = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeErrorMsg, setPasscodeErrorMsg] = useState<string>('');
  const correctPasscode = '1234'; // Replace with your correct passcode
  const styles = ForgotPasscodeStyles(colors);
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation();

  const onPressConfirm = () => {
    if (passcode === correctPasscode) {
      navigation.navigate(screenNames.SET_PASSCODE);
    } else {
      setPasscodeErrorMsg(t('FORGOT_PASSCODE.INCORRECT_NUMBER'));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  const onPasscodeChangeText = (text: string) => {
    setPasscode(text);
    setPasscodeErrorMsg(''); // Reset error message on text change
  };

  const renderToast = () =>
    showToast && (
      <IPayToast
        testID="hideBalanceToast"
        title="COMMON.INCORRECT_IQAMA"
        subTitle="COMMON.VERIFY_IQAMA"
        isShowSubTitle
        isShowButton
        borderColor={colors.primary.primary700}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.warning} size={24} />}
        viewText=""
        onPress={() => setShowToast(false)}
        containerStyle={styles.toast}
      />
    );

  return (
    <IPaySafeAreaView>
      <>
        <IPayScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <>
            <IPayView style={styles.loginIconView}>
              <icons.userTick />
            </IPayView>

            <IPayView>
              <IPayPageDescriptionText
                heading="FORGOT_PASSCODE.FORGOT_PASSCODE_HEADING"
                text="FORGOT_PASSCODE.FORGOT_PASSCODE_SUBTITLE"
              />
            </IPayView>

            <IPayView style={styles.inputFieldsContainer}>
              <IPayView style={styles.inputTextView}>
                <IPayAnimatedTextInput
                  label="COMMON.ID_IQAMA"
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
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.NEXT"
              large
              rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
            />

            <IPayButton
              onPress={() => navigate(screenNames.REGISTRATION_SUCCESSFUL)}
              btnType={buttonVariants.LINK_BUTTON}
              btnText="COMMON.NEED_HELP"
              large
              btnStyle={styles.needHelpBtn}
              rightIcon={<IPayIcon icon={icons.messageQuestion} size={20} />}
            />
          </>
        </IPayScrollView>
        {renderToast ? renderToast() : null}
      </>
    </IPaySafeAreaView>
  );
};

export default ForgotPasscodeBottomSheet;