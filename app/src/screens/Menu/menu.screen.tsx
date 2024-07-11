import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayHeadlineText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayPressable,
  IPaySpinner,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import deviceDelink from '@app/network/services/core/delink/delink.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { clearAsyncStorage } from '@utilities/storage-helper.util';
import { useCallback, useEffect, useRef, useState } from 'react';
import useActionSheetOptions from '../delink/use-delink-options';
import menuStyles from './menu.style';

const Menu: React.FC = () => {
  const { colors } = useTheme();
  const styles = menuStyles(colors);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { userInfo } = useTypedSelector((state) => state.userInfoReducer);
  const localizationText = useLocalization();
  const dispatch = useTypedDispatch();
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const actionSheetRef = useRef<any>(null);
  const logoutConfirmationSheet = useRef<any>(null);
  const [delinkFlag, setDelinkFLag] = useState(appData.isLinkedDevice);

  useEffect(() => {
    setDelinkFLag(appData.isLinkedDevice);
  }, [appData, appData.isLinkedDevice]);

  const { showToast } = useToastContext();

  const renderToast = (apiError: string) => {
    showToast({
      title: localizationText.api_request_failed,
      subTitle: apiError || localizationText.please_verify_number_accuracy,
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const onPressSettings = () => {
    navigate(screenNames.SETTINGS);
  };

  const onPressLogout = () => {
    logoutConfirmationSheet?.current.show();
  };

  const logoutConfirm = () => {
    clearAsyncStorage();
    dispatch(
      setAppData({
        isAuthenticated: false,
        isFirstTime: false,
        isLinkedDevice: delinkFlag,
        hideBalance: false,
      }),
    );
  };

  const delinkSuccessfullyDone = () => {
    clearAsyncStorage();
    navigate(screenNames.DELINK_SUCCESS, { menuOptions: true });
  };

  const delinkDevice = async () => {
    setIsLoading(true);
    try {
      const payload: DeviceInfoProps = {
        deviceInfo: appData.deviceInfo,
      };

      const apiResponse = await deviceDelink(payload);
      if (apiResponse?.ok) {
        delinkSuccessfullyDone();
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

  const handleDelink = () => {
    actionSheetRef.current.show();
  };

  const hideDelink = () => {
    actionSheetRef.current.hide();
  };

  const delinkSuccessfully = useCallback((index: number) => {
    if (index == 1) {
      delinkDevice();
    } else {
      hideDelink();
    }
  }, []);

  const hideLogout = () => {
    logoutConfirmationSheet.current.hide();
  };
  const onConfirmLogout = useCallback((index: number) => {
    if (index == 1) {
      logoutConfirm();
    } else {
      hideLogout();
    }
  }, []);

  // Using the useActionSheetOptions hook
  const actionSheetOptions = useActionSheetOptions(delinkSuccessfully);

  return (
    <IPaySafeAreaView>
      <IPayHeader languageBtn menu />
      {isLoading && <IPaySpinner />}
      <IPayView style={styles.container}>
        <IPayPressable
          onPress={() => {
            navigate(screenNames.PROFILE);
          }}
        >
          <IPayView style={styles.profileHeaderView}>
            <IPayLinearGradientView gradientColors={colors.appGradient.gradientPrimary10} style={styles.profileView}>
              <IPayImage image={images.profile} style={styles.profileImage} />
              <IPayView style={styles.profileTextView}>
                <IPayHeadlineText
                  regular={false}
                  text={userInfo?.fullName}
                  color={colors.primary.primary900}
                  style={styles.profileNameText}
                />
                <IPayCaption1Text text={localizationText.MENU.SHOW_PROFILE} color={colors.natural.natural900} />
              </IPayView>
              <IPayIcon icon={icons.drill_in_icon} size={18} color={colors.primary.primary900} />
            </IPayLinearGradientView>
          </IPayView>
        </IPayPressable>

        <IPayPressable onPress={onPressSettings} style={styles.menuItemView}>
          <IPayIcon icon={icons.setting} size={24} color={colors.primary.primary900} />
          <IPaySubHeadlineText
            regular
            text={localizationText.COMMON.SETTINGS}
            style={styles.menuItemText}
            color={colors.primary.primary800}
          />
          <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary800} />
        </IPayPressable>

        <IPayPressable onPress={() => navigate(screenNames.HELP_CENTER)} style={styles.menuItemView}>
          <IPayIcon icon={icons.messageQuestion} size={24} color={colors.primary.primary900} />
          <IPaySubHeadlineText
            regular
            text={localizationText.MENU.SUPPORT_AND_HELP}
            style={styles.menuItemText}
            color={colors.primary.primary800}
          />
          <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary800} />
        </IPayPressable>

        <IPayPressable onPress={() => {}} style={styles.menuItemView}>
          <IPayIcon icon={icons.cards} size={24} color={colors.primary.primary900} />
          <IPaySubHeadlineText
            regular
            text={localizationText.MENU.CARDS_MANAGEMENT}
            style={styles.menuItemText}
            color={colors.primary.primary800}
          />
          <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary800} />
        </IPayPressable>

        <IPayView style={styles.separatorBar} />

        <IPayPressable onPress={handleDelink} style={styles.secondayItemView}>
          <IPayIcon icon={icons.logout} size={24} color={colors.natural.natural700} />
          <IPaySubHeadlineText
            regular
            text={localizationText.delink}
            style={styles.menuItemText}
            color={colors.natural.natural700}
          />
        </IPayPressable>

        <IPayPressable onPress={onPressLogout} style={styles.secondayItemView}>
          <IPaySubHeadlineText
            regular
            text={localizationText.MENU.LOGOUT}
            style={styles.menuItemText}
            color={colors.natural.natural700}
          />
        </IPayPressable>
      </IPayView>

      <IPayActionSheet
        ref={actionSheetRef}
        testID="delink-action-sheet"
        title={actionSheetOptions.title}
        message={actionSheetOptions.message}
        options={actionSheetOptions.options}
        cancelButtonIndex={actionSheetOptions.cancelButtonIndex}
        destructiveButtonIndex={actionSheetOptions.destructiveButtonIndex}
        showIcon={actionSheetOptions.showIcon}
        showCancel={actionSheetOptions.showCancel}
        customImage={actionSheetOptions.customImage}
        onPress={delinkSuccessfully}
      />

      <IPayActionSheet
        ref={logoutConfirmationSheet}
        testID="logout-action-sheet"
        title={localizationText.MENU.LOGOUT_CONFIRMATION}
        options={[localizationText.COMMON.CANCEL, localizationText.MENU.LOGOUT]}
        cancelButtonIndex={actionSheetOptions.cancelButtonIndex}
        destructiveButtonIndex={actionSheetOptions.destructiveButtonIndex}
        showIcon={actionSheetOptions.showIcon}
        showCancel={actionSheetOptions.showCancel}
        customImage={<IPayIcon icon={icons.information} color={'red'} size={48} />}
        onPress={onConfirmLogout}
      />
    </IPaySafeAreaView>
  );
};

export default Menu;
