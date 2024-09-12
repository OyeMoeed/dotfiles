import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayHeader, IPayLanguageSelectorButton, IPayOutlineButton, IPayToggleButton } from '@app/components/molecules';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useBiometricService from '@app/network/services/core/biometric/biometric-service';
import { UpdateBiomatricStatusProps } from '@app/network/services/core/update-biomatric-status/update-biomatric-status.interface';
import updateBiomatricStatus from '@app/network/services/core/update-biomatric-status/update-biomatric-status.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { setAllowEyeIconFunctionality, setAppData, setNotificationSettings } from '@app/store/slices/app-data-slice';
import { LanguageState } from '@app/store/slices/language-slice.interface';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { LanguageCode, ToastTypes } from '@app/utilities/enums.util';
import { IPayCaption1Text, IPayFootnoteText, IPayIcon, IPayImage, IPayView } from '@components/atoms';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConfirmPasscode from '../auth/confirm-reset/confirm-reset.screen';
import NewPasscode from '../auth/confirm-reset/new-passcode.screen';
import IPayResetPasscode from '../auth/reset-passcode/reset-passcode.screen';
import { PasscodeTypes } from './settings.interface';
import settingStyles from './settings.styles';
import useSettings from './use-settings.hook';

const Settings: React.FC = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { allowEyeIconFunctionality, notificationSettings } = appData;
  const [biomatricToggle, setBioMatricToggle] = useState<boolean>(false);
  const styles = settingStyles(colors);

  const { showToast } = useToastContext();
  const dispatch = useTypedDispatch();

  // use setting hook
  const {
    onEnterPassCode,
    passcodeError,
    renderView,
    currentPasscode,
    newPaasscode,
    currentPasscodeRef,
    openBottomSheet,
    onCloseBottomSheet,
    onOpenPasscodeSheet,
    changeView,
  } = useSettings();

  const { handleStorePasscode, handleRemovePasscode, isDataStore } = useBiometricService();
  // useState(() => {
  //   setHideBalanceMode(appData?.hideBalance);
  // }, [appData?.hideBalance]);

  const toggleNotification = () => {
    dispatch(setNotificationSettings({ hasActiveNotification: !notificationSettings.hasActiveNotification }));
  };

  const toggleGeneralNotification = () => {
    dispatch(setNotificationSettings({ hasGeneralNotification: !notificationSettings.hasGeneralNotification }));
  };
  const toggleOffersNotification = () => {
    dispatch(setNotificationSettings({ hasOffersNotification: !notificationSettings.hasOffersNotification }));
  };

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title: title || localizationText.PROFILE.PASSCODE_ERROR,
        subTitle,
        toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  const handleToggleHideBalance = () => {
    // const newHideBalanceMode = !isHideBalanceMode;
    // setHideBalanceMode(newHideBalanceMode);
    renderToast({
      title: allowEyeIconFunctionality
        ? localizationText.CARDS.BALANCE_IS_VISIBLE
        : localizationText.CARDS.BALANCE_IS_HIDDEN,
      toastType: ToastTypes.INFORMATION,
      icon: (
        <IPayIcon
          icon={allowEyeIconFunctionality ? icons.eye : icons.eye_slash}
          size={24}
          color={colors.natural.natural0}
        />
      ),
      displayTime: 1000,
    });
    dispatch(setAppData({ hideBalance: !appData.allowEyeIconFunctionality }));
    dispatch(setAllowEyeIconFunctionality(!appData.allowEyeIconFunctionality));
  };

  const selectedLanguage =
    useSelector((state: { languageReducer: LanguageState }) => state.languageReducer.selectedLanguage) ||
    LanguageCode.EN;

  const updateBiomatricStatusOnServer = async (bioRecognition: boolean) => {
    try {
      const payload: UpdateBiomatricStatusProps = {
        bioRecognition,
        deviceInfo: appData?.deviceInfo as DeviceInfoProps,
      };

      const apiResponse = await updateBiomatricStatus(payload, walletInfo.walletNumber);
      if (apiResponse.status.type === 'SUCCESS') {
        renderToast({
          title: !biomatricToggle
            ? localizationText.CARDS.BIOMETRIC_STATUS_UPDATED
            : localizationText.CARDS.BIOMETRIC_STATUS_DISABLED,
          toastType: ToastTypes.INFORMATION,
          icon: <IPayIcon icon={icons.FACE_ID} size={24} color={colors.natural.natural0} />,
          displayTime: 1000,
        });
      } else {
        renderToast({
          title: localizationText.CARDS.BIOMERTIC_STATUS,
          subTitle: localizationText.ERROR.API_ERROR_RESPONSE,
        });
      }
    } catch (error) {
      renderToast({
        title: localizationText.CARDS.BIOMERTIC_STATUS,
        subTitle: error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG,
      });
    }
  };

  const { handleSetupBiomatricForSettings } = useBiometricService();

  const onBioMatricToggleChange = (enableBiomatric: boolean) => {
    dispatch(setAppData({ biomatricEnabled: enableBiomatric }));
    setBioMatricToggle(enableBiomatric);
    if (enableBiomatric) {
      handleStorePasscode();
      isDataStore().then((passwordIsSavedToKeychain) => {
        setBioMatricToggle(passwordIsSavedToKeychain);
      });
    } else {
      handleRemovePasscode();
    }
    updateBiomatricStatusOnServer(enableBiomatric);
  };

  const checkBiomatric = async () => {
    if (!biomatricToggle) {
      const isAuthorized = await handleSetupBiomatricForSettings();
      if (isAuthorized) {
        onBioMatricToggleChange(true);
      } else {
        setBioMatricToggle(false);
      }
    } else {
      onBioMatricToggleChange(false);
    }
  };

  useEffect(() => {
    isDataStore().then((passwordIsSavedToKeychain) => {
      setBioMatricToggle(!!appData?.biomatricEnabled && passwordIsSavedToKeychain);
    });
  }, [appData, appData?.biomatricEnabled]);

  return (
    <IPaySafeAreaView style={styles.containerStyle}>
      <IPayHeader title={localizationText.COMMON.SETTINGS} backBtn applyFlex />
      <IPayView style={[styles.cardStyle, styles.marginTop]}>
        <IPayView style={styles.cardText}>
          <IpayFlagIcon country={selectedLanguage} />
          <IPayFootnoteText style={styles.flagStyle}>{localizationText.COMMON.LANGUAGE}</IPayFootnoteText>
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
            rightIcon={<IPayImage image={images.edit} style={styles.editIconStyle} />}
            onPress={onOpenPasscodeSheet}
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
          <IPayToggleButton toggleState={biomatricToggle} onToggleChange={checkBiomatric} />
        </IPayView>

        <IPayView style={styles.cardStyle}>
          <IPayView style={styles.cardText}>
            <IPayIcon icon={icons.EYE} size={24} color={colors.primary.primary900} />
            <IPayView style={styles.flagStyle}>
              <IPayFootnoteText style={styles.cardTitleText}>{localizationText.SETTINGS.HIDE_BALANCE}</IPayFootnoteText>
              <IPayCaption1Text style={styles.captionText}>{localizationText.SETTINGS.TOGGLE}</IPayCaption1Text>
            </IPayView>
          </IPayView>
          <IPayToggleButton toggleState={allowEyeIconFunctionality} onToggleChange={handleToggleHideBalance} />
        </IPayView>
        <IPayView>
          <IPayFootnoteText style={styles.sectionHeader}>{localizationText.COMMON.NOTIFICATIONS}</IPayFootnoteText>
          <IPayView style={styles.cardStyle}>
            <IPayView style={styles.cardText}>
              <IPayIcon icon={icons.notification_bing} color={colors.primary.primary900} size={24} />
              <IPayFootnoteText style={styles.flagStyle}>
                {localizationText.SETTINGS.ACTIVE_NOTIFICATIONS}
              </IPayFootnoteText>
            </IPayView>
            <IPayToggleButton
              toggleState={notificationSettings?.hasActiveNotification}
              onToggleChange={toggleNotification}
            />
          </IPayView>
          {notificationSettings?.hasActiveNotification && (
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
                <IPayToggleButton
                  toggleState={notificationSettings?.hasGeneralNotification}
                  onToggleChange={toggleGeneralNotification}
                />
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
                <IPayToggleButton
                  toggleState={notificationSettings?.hasOffersNotification}
                  onToggleChange={toggleOffersNotification}
                />
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
        customSnapPoint={SNAP_POINTS.LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={openBottomSheet}
      >
        <>
          {renderView === PasscodeTypes.ResetPasscode && (
            <IPayResetPasscode
              ref={currentPasscodeRef}
              passcodeError={passcodeError}
              onEnterPassCode={onEnterPassCode}
            />
          )}
          {renderView === PasscodeTypes.NewPasscode && (
            <NewPasscode changeView={changeView} currentCode={currentPasscode} />
          )}
          {renderView === PasscodeTypes.ConfirmPasscode && (
            <ConfirmPasscode
              closeBottomSheet={onCloseBottomSheet}
              currentPasscode={currentPasscode}
              newPasscode={newPaasscode}
              walletInfo={walletInfo}
              appData={appData}
            />
          )}
        </>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default Settings;
