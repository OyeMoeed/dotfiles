import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayHeadlineText,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayHeader, IPayUserAvatar } from '@app/components/molecules';
import { IPayActionSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { DelinkPayload } from '@app/network/services/core/delink/delink-device.interface';
import deviceDelink from '@app/network/services/core/delink/delink.service';
import logOut from '@app/network/services/core/logout/logout.service';
import { getDeviceInfo } from '@app/network/utilities';
import clearSession from '@app/network/utilities/network-session-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType } from '@app/utilities/enums.util';
import { FC, useCallback, useRef } from 'react';
import useActionSheetOptions from '../delink/use-delink-options';
import menuStyles from './menu.style';

const MenuScreen: FC = () => {
  const { colors } = useTheme();
  const styles = menuStyles(colors);
  const { walletNumber, fullName } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const localizationText = useLocalization();
  const actionSheetRef = useRef<any>(null);
  const logoutConfirmationSheet = useRef<any>(null);

  const onPressSettings = () => {
    navigate(screenNames.SETTINGS);
  };

  const onPressLogout = () => {
    logoutConfirmationSheet?.current.show();
  };

  const hideLogout = () => {
    logoutConfirmationSheet.current.hide();
  };

  const logoutConfirm = async () => {
    const apiResponse: any = await logOut();
    if (apiResponse) {
      hideLogout();
      clearSession(false);
    }
  };

  const delinkSuccessfullyDone = () => {
    clearSession(true);
  };

  const delinkDevice = async () => {
    const delinkReqBody = await getDeviceInfo();
    const payload: DelinkPayload = {
      delinkReq: delinkReqBody,
      walletNumber,
    };

    const apiResponse: any = await deviceDelink(payload);

    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      delinkSuccessfullyDone();
    }
  };

  const handleDelink = () => {
    actionSheetRef.current.show();
  };

  const hideDelink = () => {
    actionSheetRef.current.hide();
  };

  const delinkSuccessfully = useCallback((index?: number) => {
    if (index === 1) {
      delinkDevice();
    }
    hideDelink();
  }, []);

  const onConfirmLogout = useCallback((index: number) => {
    if (index === 1) {
      logoutConfirm();
    } else {
      hideLogout();
    }
  }, []);

  // Using the useActionSheetOptions hook
  const actionSheetOptions = useActionSheetOptions(delinkSuccessfully);

  const onNavigateToCardManagement = () => {
    navigate(screenNames.CARD_MANAGEMENT);
  };

  return (
    <IPaySafeAreaView>
      <>
        <IPayHeader languageBtn menu />
        <IPayView style={styles.container}>
          <IPayPressable
            onPress={() => {
              navigate(screenNames.PROFILE);
            }}
          >
            <IPayView style={styles.profileHeaderView}>
              <IPayLinearGradientView gradientColors={colors.appGradient.gradientPrimary10} style={styles.profileView}>
                <IPayUserAvatar style={styles.profileImage} />
                <IPayView style={styles.profileTextView}>
                  <IPayHeadlineText
                    numberOfLines={2}
                    regular={false}
                    text={fullName}
                    color={colors.primary.primary900}
                    style={styles.profileNameText}
                  />
                  <IPayCaption1Text text="MENU.SHOW_PROFILE" color={colors.natural.natural900} />
                </IPayView>
                <IPayIcon icon={icons.drill_in_icon} size={18} color={colors.primary.primary900} />
              </IPayLinearGradientView>
            </IPayView>
          </IPayPressable>

          <IPayPressable onPress={onPressSettings} style={styles.menuItemView}>
            <IPayIcon icon={icons.setting} size={24} color={colors.primary.primary900} />
            <IPaySubHeadlineText
              regular
              text="COMMON.SETTINGS"
              style={styles.menuItemText}
              color={colors.primary.primary800}
            />
            <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary800} />
          </IPayPressable>

          <IPayPressable onPress={() => navigate(screenNames.HELP_CENTER)} style={styles.menuItemView}>
            <IPayIcon icon={icons.messageQuestion} size={24} color={colors.primary.primary900} />
            <IPaySubHeadlineText
              regular
              text="MENU.SUPPORT_AND_HELP"
              style={styles.menuItemText}
              color={colors.primary.primary800}
            />
            <IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary800} />
          </IPayPressable>

          <IPayPressable onPress={onNavigateToCardManagement} style={styles.menuItemView}>
            <IPayIcon icon={icons.cards} size={24} color={colors.primary.primary900} />
            <IPaySubHeadlineText
              regular
              text="MENU.CARDS_MANAGEMENT"
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
              text="COMMON.DELINK_ALERT.DELINK"
              style={styles.menuItemText}
              color={colors.natural.natural700}
            />
          </IPayPressable>

          <IPayPressable onPress={onPressLogout} style={styles.secondayItemView}>
            <IPaySubHeadlineText
              regular
              text="MENU.LOGOUT"
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
          bodyStyle={styles.delinkSheetBodyStyle}
        />

        <IPayActionSheet
          ref={logoutConfirmationSheet}
          testID="logout-action-sheet"
          title="MENU.LOGOUT_CONFIRMATION"
          options={[t('COMMON.CANCEL'), t('MENU.LOGOUT]')]}
          cancelButtonIndex={actionSheetOptions.cancelButtonIndex}
          destructiveButtonIndex={actionSheetOptions.destructiveButtonIndex}
          showIcon={actionSheetOptions.showIcon}
          showCancel={actionSheetOptions.showCancel}
          customImage={<IPayIcon icon={icons.information} color="red" size={48} />}
          onPress={onConfirmLogout}
          bodyStyle={styles.logoutSheetBodyStyle}
        />
      </>
    </IPaySafeAreaView>
  );
};

export default MenuScreen;
