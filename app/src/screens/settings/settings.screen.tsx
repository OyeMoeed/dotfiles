import React, { useRef, useState } from 'react';
import {
  IPayHeader,
  IPayLanguageSelectorButton,
  IPayOutlineButton,
  IPayToast,
  IPayToggleButton,
} from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayCaption1Text, IPayFootnoteText, IPayIcon, IPayView } from '@components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import icons from '@app/assets/icons';
import settingStyles from './settings.styles';
import ResetPasscode from '../auth/reset-passcode/reset-passcode.screen';
import NewPasscode from '../auth/confirm-reset/new-passcode.screen';
import ConfirmPasscode from '../auth/confirm-reset/confirm-reset.screen';
import {  useSelector } from 'react-redux';
import { LanguageCode } from '@app/utilities/enums.util';
import { LanguageState } from '@app/store/slices/language-sclice.interface';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
const Settings: React.FC = () => {
  const localizationText = useLocalization();
  const {  colors } = useTheme();
  const [isNotificationActive, setNotificationActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isHideBalanceMode, setHideBalanceMode] = useState(false);
  const styles = settingStyles(colors);
  const changePasscodeRef = useRef(null);
  const [currentComponent, setCurrentComponent] = useState('ResetPasscode'); // Initial component

  const handleToggleNotification = () => {
    setNotificationActive(!isNotificationActive);
  };

  const openBottomSheet = useRef(null);

  const onCloseBottomSheet = () => {
    changePasscodeRef.current?.resetInterval();
    setCurrentComponent('ResetPasscode');
    openBottomSheet.current?.close();
  };

  const handleToggleHideBalance = () => {
    const newHideBalanceMode = !isHideBalanceMode;
    setHideBalanceMode(newHideBalanceMode);
    if (newHideBalanceMode) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const selectedLanguage =
    useSelector((state: { languageReducer: LanguageState }) => state.languageReducer.selectedLanguage) ||
    LanguageCode.EN;

  const [renderView, setRenderView] = useState('ResetPasscode');

  const changeView = (view) => {
    setRenderView(view);
  };

  const renderToast = () =>
    showToast && (
      <IPayToast
        testID="hideBalanceToast"
        bgColor={colors.secondary.secondary500}
        textStyle={styles.toastText}
        title={localizationText.hidden_balance}
        isShowLeftIcon
        leftIcon={<IPayIcon icon="eye-slash" size={24} color={colors.natural.natural0} />}
        viewText=""
        onPress={() => setShowToast(false)}
        containerStyle={styles.toast}
      />
    );

  return (
    <IPaySafeAreaView style={styles.containerStyle}>
      <IPayHeader title={localizationText.settings} backBtn applyFlex />
      <IPayView style={[styles.cardStyle, styles.marginTop]}>
        <IPayView style={styles.cardText}>
          <IpayFlagIcon country="en" />
          <IPayFootnoteText style={styles.flagStyle}>{localizationText.language}</IPayFootnoteText>
        </IPayView>

        <IPayLanguageSelectorButton
          showFlag={false}
          color={colors.primary.primary500}
          textColor={colors.primary.primary500}
        />
      </IPayView>
      <IPayView>
        <IPayFootnoteText style={styles.sectionHeader}>{localizationText.securitySettings}</IPayFootnoteText>
        <IPayView style={styles.cardStyle}>
          <IPayView style={styles.cardText}>
            <IPayIcon icon={icons.LOCK} color={colors.primary.primary900} size={24} />
            <IPayView style={styles.flagStyle}>
              <IPayFootnoteText>{localizationText.passcode}</IPayFootnoteText>
              <IPayCaption1Text style={styles.captionText}>{localizationText.pin}</IPayCaption1Text>
            </IPayView>
          </IPayView>

          <IPayOutlineButton
            rightIcon={<IPayIcon icon="edit-2" size={18} />}
            onPress={() => {
              setRenderView('ResetPasscode');
              openBottomSheet.current?.present();
            }}
            btnText={localizationText.change}
          />
        </IPayView>
        <IPayView style={styles.cardStyle}>
          <IPayView style={styles.cardText}>
            <IPayIcon icon={icons.FACE_ID} size={24} color={colors.natural.natural900} />
            <IPayView style={styles.flagStyle}>
              <IPayFootnoteText>{localizationText.enableBiometrics}</IPayFootnoteText>
              <IPayCaption1Text style={styles.captionText}>{localizationText.loginBiometrics}</IPayCaption1Text>
            </IPayView>
          </IPayView>
          <IPayToggleButton toggleState={false} />
        </IPayView>
        <IPayView style={styles.cardStyle}>
          <IPayView style={styles.cardText}>
            <IPayIcon icon={icons.EYE} size={24} color={colors.primary.primary900} />
            <IPayView style={styles.flagStyle}>
              <IPayFootnoteText>{localizationText.hideBalance}</IPayFootnoteText>
              <IPayCaption1Text style={styles.captionText}>{localizationText.toggle}</IPayCaption1Text>
            </IPayView>
          </IPayView>
          <IPayToggleButton toggleState={isHideBalanceMode} onToggleChange={handleToggleHideBalance} />
        </IPayView>
        <IPayView>
          <IPayFootnoteText style={styles.sectionHeader}>{localizationText.notifications}</IPayFootnoteText>
          <IPayView style={styles.cardStyle}>
            <IPayView style={styles.cardText}>
              <IPayIcon icon={icons.NOTIFICATIONS} color={colors.primary.primary900} size={24} />
              <IPayFootnoteText style={styles.flagStyle}>{localizationText.activeNotifications}</IPayFootnoteText>
            </IPayView>
            <IPayToggleButton toggleState={isNotificationActive} onToggleChange={handleToggleNotification} />
          </IPayView>
          {isNotificationActive && (
            <>
              <IPayView style={styles.cardStyle}>
                <IPayView style={styles.cardText}>
                  <IPayView>
                    <IPayFootnoteText>{localizationText.generalNotification}</IPayFootnoteText>
                    <IPayCaption1Text style={styles.captionText}>{localizationText.generalSubtext}</IPayCaption1Text>
                  </IPayView>
                </IPayView>
                <IPayToggleButton toggleState />
              </IPayView>
              <IPayView style={styles.cardStyle}>
                <IPayView style={styles.cardText}>
                  <IPayView>
                    <IPayFootnoteText>{localizationText.offers}</IPayFootnoteText>
                    <IPayCaption1Text style={styles.captionText}>{localizationText.offersSubtext}</IPayCaption1Text>
                  </IPayView>
                </IPayView>
                <IPayToggleButton toggleState />
              </IPayView>
            </>
          )}
        </IPayView>
      </IPayView>

      <IPayBottomSheet
        heading="Change Passcode"
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={openBottomSheet}
      >
        {renderView === 'ResetPasscode' && <ResetPasscode changeView={changeView} />}
        {renderView === 'NewPasscode' && <NewPasscode changeView={changeView} />}
        {renderView === 'ConfirmPasscode' && (
          <ConfirmPasscode changeView={changeView} closeBottomSheet={onCloseBottomSheet} />
        )}
      </IPayBottomSheet>

      {renderToast()}
    </IPaySafeAreaView>
  );
};

export default Settings;
