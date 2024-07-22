import icons from '@app/assets/icons';
import { IPayHeader, IPayLanguageSelectorButton, IPayOutlineButton, IPayToggleButton } from '@app/components/molecules';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { ChangePasswordProps } from '@app/network/services/core/change-passcode/change-passcode.interface';
import updateBiomatricStatus from '@app/network/services/core/update-biomatric-status/update-biomatric-status.service';
import { setAppData } from '@app/store/slices/app-data-slice';
import { LanguageState } from '@app/store/slices/language-sclice.interface';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { LanguageCode, toastTypes } from '@app/utilities/enums.util';
import { IPayCaption1Text, IPayFootnoteText, IPayIcon, IPaySpinner, IPayView } from '@components/atoms';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ConfirmPasscode from '../auth/confirm-reset/confirm-reset.screen';
import NewPasscode from '../auth/confirm-reset/new-passcode.screen';
import ResetPasscode from '../auth/reset-passcode/reset-passcode.screen';
import settingStyles from './settings.styles';

const Settings: React.FC = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [isNotificationActive, setNotificationActive] = useState<boolean>(false);
  const [isHideBalanceMode, setHideBalanceMode] = useState<boolean>(false);
  const [currentPasscode, setCurrentPasscode] = useState<string>('');
  const [newPaasscode, setNewPasscode] = useState<string>('');
  const [biomatricToggle, setBioMatricToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const styles = settingStyles(colors);
  const changePasscodeRef = useRef(null);
  const [currentComponent, setCurrentComponent] = useState('ResetPasscode'); // Initial component
  const { showToast } = useToastContext();
  const dispatch = useTypedDispatch();

  useState(() => {
    setHideBalanceMode(appData?.hideBalance);
  }, [appData?.hideBalance]);

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
    renderToast({
      title: newHideBalanceMode ? localizationText.CARDS.BALANCE_IS_HIDDEN : localizationText.CARDS.BALANCE_IS_VISIBLE,
      toastType: toastTypes.INFORMATION,
      icon: (
        <IPayIcon icon={newHideBalanceMode ? icons.eye_slash : icons.eye} size={24} color={colors.natural.natural0} />
      ),
      displayTime: 1000,
    });
    dispatch(setAppData({ hideBalance: newHideBalanceMode }));
  };

  const selectedLanguage =
    useSelector((state: { languageReducer: LanguageState }) => state.languageReducer.selectedLanguage) ||
    LanguageCode.EN;

  const [renderView, setRenderView] = useState('ResetPasscode');

  const changeView = (data) => {
    if (data?.currentCode) setCurrentPasscode(data?.currentCode);
    if (data?.newCode) setNewPasscode(data?.newCode);
    setRenderView(data.nextComponent);
  };

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title: title || localizationText.PROFILE.PASSCODE_ERROR,
        subTitle: subTitle,
        toastType: toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  const onBioMatricToggleChange = () => {
    dispatch(setAppData({ biomatricEnabled: !biomatricToggle }));
    setBioMatricToggle(!biomatricToggle);
    updateBiomatricStatusOnServer(!biomatricToggle);
  };

  const updateBiomatricStatusOnServer = async (bioRecognition: boolean) => {
    setIsLoading(true);
    try {
      const payload: ChangePasswordProps = {
        bioRecognition,
        deviceInfo: appData?.deviceInfo,
      };

      const apiResponse = await updateBiomatricStatus(payload);
      if (apiResponse.ok) {
        renderToast({
          title: localizationText.CARDS.BIOMERTIC_STATUS,
          subTitle: localizationText.CARDS.BIOMETRIC_STATUS_UPDATED,
          toastType: toastTypes.SUCCESS,
          displayTime: 1000,
        });
      } else if (apiResponse?.apiResponseNotOk) {
        renderToast({
          title: localizationText.CARDS.BIOMERTIC_STATUS,
          subTitle: localizationText.ERROR.API_ERROR_RESPONSE,
        });
      } else {
        renderToast({
          title: localizationText.CARDS.BIOMERTIC_STATUS,
          subTitle: apiResponse?.error,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      renderToast({
        title: localizationText.CARDS.BIOMERTIC_STATUS,
        subTitle: error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG,
      });
    }
  };

  useEffect(() => {
    if (!constants.MOCK_API_RESPONSE) setBioMatricToggle(walletInfo?.bioRecognition);
    setBioMatricToggle(appData?.biomatricEnabled);
  }, [walletInfo, appData?.biomatricEnabled]);

  return (
    <IPaySafeAreaView style={styles.containerStyle}>
      {isLoading && <IPaySpinner />}
      <IPayHeader title={localizationText.COMMON.SETTINGS} backBtn applyFlex />
      <IPayView style={[styles.cardStyle, styles.marginTop]}>
        <IPayView style={styles.cardText}>
          <IpayFlagIcon country="en" />
          <IPayFootnoteText style={styles.flagStyle}>{localizationText.COMMON.LANGUAGE.TITLE}</IPayFootnoteText>
        </IPayView>

        <IPayLanguageSelectorButton
          showFlag={false}
          color={colors.primary.primary500}
          textColor={colors.primary.primary500}
        />
      </IPayView>
      <IPayView>
        <IPayFootnoteText style={styles.sectionHeader}>{localizationText.SETTINGS.SECURITY_SETTINGS}</IPayFootnoteText>
        <IPayView style={styles.cardStyle}>
          <IPayView style={styles.cardText}>
            <IPayIcon icon={icons.LOCK} color={colors.primary.primary900} size={24} />
            <IPayView style={styles.flagStyle}>
              <IPayFootnoteText style={styles.cardTitleText}>{localizationText.SETTINGS.PASSCODE}</IPayFootnoteText>
              <IPayCaption1Text style={styles.captionText}>{localizationText.SETTINGS.PIN}</IPayCaption1Text>
            </IPayView>
          </IPayView>

          <IPayOutlineButton
            rightIcon={<IPayIcon icon="edit-2" size={18} />}
            onPress={() => {
              setRenderView('ResetPasscode');
              openBottomSheet.current?.present();
            }}
            btnText={localizationText.SETTINGS.CHANGE}
          />
        </IPayView>
        <IPayView style={styles.cardStyle}>
          <IPayView style={styles.cardText}>
            <IPayIcon icon={icons.FACE_ID} size={24} color={colors.natural.natural900} />
            <IPayView style={styles.flagStyle}>
              <IPayFootnoteText style={styles.cardTitleText}>
                {localizationText.SETTINGS.ENABLE_BIOMETRICS}
              </IPayFootnoteText>
              <IPayCaption1Text style={styles.captionText}>
                {localizationText.SETTINGS.LOGIN_BIOMETRICS}
              </IPayCaption1Text>
            </IPayView>
          </IPayView>
          <IPayToggleButton toggleState={biomatricToggle} onToggleChange={onBioMatricToggleChange} />
        </IPayView>
        <IPayView style={styles.cardStyle}>
          <IPayView style={styles.cardText}>
            <IPayIcon icon={icons.EYE} size={24} color={colors.primary.primary900} />
            <IPayView style={styles.flagStyle}>
              <IPayFootnoteText style={styles.cardTitleText}>{localizationText.SETTINGS.HIDE_BALANCE}</IPayFootnoteText>
              <IPayCaption1Text style={styles.captionText}>{localizationText.SETTINGS.TOGGLE}</IPayCaption1Text>
            </IPayView>
          </IPayView>
          <IPayToggleButton toggleState={isHideBalanceMode} onToggleChange={handleToggleHideBalance} />
        </IPayView>
        <IPayView>
          <IPayFootnoteText style={styles.sectionHeader}>{localizationText.COMMON.NOTIFICATIONS}</IPayFootnoteText>
          <IPayView style={styles.cardStyle}>
            <IPayView style={styles.cardText}>
              <IPayIcon icon={icons.NOTIFICATIONS} color={colors.primary.primary900} size={24} />
              <IPayFootnoteText style={styles.flagStyle}>
                {localizationText.SETTINGS.ACTIVE_NOTIFICATIONS}
              </IPayFootnoteText>
            </IPayView>
            <IPayToggleButton toggleState={isNotificationActive} onToggleChange={handleToggleNotification} />
          </IPayView>
          {isNotificationActive && (
            <>
              <IPayView style={styles.cardStyle}>
                <IPayView style={styles.cardText}>
                  <IPayView>
                    <IPayFootnoteText style={styles.cardTitleText}>
                      {localizationText.SETTINGS.GENERAL_NOTIFICATION}
                    </IPayFootnoteText>
                    <IPayCaption1Text style={styles.captionText}>
                      {localizationText.SETTINGS.GENERAL_SUBTEXT}
                    </IPayCaption1Text>
                  </IPayView>
                </IPayView>
                <IPayToggleButton toggleState />
              </IPayView>
              <IPayView style={styles.cardStyle}>
                <IPayView style={styles.cardText}>
                  <IPayView>
                    <IPayFootnoteText style={styles.cardTitleText}>{localizationText.SETTINGS.OFFERS}</IPayFootnoteText>
                    <IPayCaption1Text style={styles.captionText}>
                      {localizationText.SETTINGS.OFFERS_SUBTEXT}
                    </IPayCaption1Text>
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
        {renderView === 'NewPasscode' && <NewPasscode changeView={changeView} currentCode={currentPasscode} />}
        {renderView === 'ConfirmPasscode' && (
          <ConfirmPasscode
            closeBottomSheet={onCloseBottomSheet}
            currentPasscode={currentPasscode}
            newPasscode={newPaasscode}
            walletInfo={walletInfo}
            appData={appData}
          />
        )}
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default Settings;
