import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { TopupStatus, payChannel } from '@app/utilities/enums.util';
import React, { useRef } from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import TransferScreenStyle from './transfer-summary.styles';

const TransferSummaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = TransferScreenStyle(colors);
  const sendMoneyBottomSheetRef = useRef<any>(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);

  const alinmaDetails = [
    {
      id: '1',
      label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
      value: localizationText.TRANSFER_SUMMARY.ADAM_AHMAD,
      leftIcon: images.logoTab,
      isAlinma: true,
    },
    { id: '2', label: localizationText.TRANSFER_SUMMARY.AMOUNT, value: localizationText.TRANSFER_SUMMARY.MONEY },
    {
      id: '3',
      label: localizationText.TRANSFER_SUMMARY.REASON,
      value: localizationText.TRANSFER_SUMMARY.REASON_TRANSFER,
    },
    { id: '4', label: localizationText.TRANSFER_SUMMARY.NOTE, value: localizationText.TRANSFER_SUMMARY.NOTE_DETAIL },
  ];

  const nonAlinmaDetails = [
    {
      id: '1',
      label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
      value: localizationText.TRANSFER_SUMMARY.ERSA_ALTURK,
      leftIcon: icons.user_square,
      color: colors.primary.primary900,
      isAlinma: false,
    },
    { id: '2', label: localizationText.TRANSFER_SUMMARY.AMOUNT, value: localizationText.TRANSFER_SUMMARY.AMOUNT_2 },
    {
      id: '3',
      label: localizationText.TRANSFER_SUMMARY.REASON,
      value: localizationText.TRANSFER_SUMMARY.REASON_TRANSFER,
    },
  ];

  const renderWalletPayItem = ({ item }) => {
    const renderLeftIcon = () => {
      if (item.leftIcon) {
        if (item.isAlinma) {
          return (
            <IPayView style={styles.leftIcon}>
              <IPayImage image={item.leftIcon} style={styles.alinmaLogo} resizeMode="contain" />
            </IPayView>
          );
        }
        return (
          <IPayPressable style={styles.appleIcon} onPress={item.onPress}>
            <IPayIcon icon={item.leftIcon} style={styles.appleIcon} color={item.color} size={scaleSize(18)} />
          </IPayPressable>
        );
      }
      return null;
    };

    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.walletListBackground}>
          <IPayView style={styles.iconLabel}>
            {renderLeftIcon()}
            <IPayFootnoteText text={item.label} style={styles.label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={item.value} style={styles.detailsText} />
            {item.icon && (
              <IPayPressable style={styles.appleIcon} onPress={item.onPress}>
                <IPayIcon icon={item.icon} style={styles.appleIcon} color={item.color} size={scaleSize(18)} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };
  const renderNonAlinmaPayItem = ({ item, index }) => {
    const isFirstItem = index === 0;

    return (
      <IPayView key={item.id}>
        {isFirstItem && (
          <IPayView style={styles.chipContainer}>
            <IPayChip
              containerStyle={styles.chipColors}
              icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
              textValue={localizationText.TRANSFER_SUMMARY.CHIP_TITLE}
              headingStyles={styles.chipColors}
            />
          </IPayView>
        )}
        {renderWalletPayItem({ item })}
      </IPayView>
    );
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
  };

  return (
    <>
      <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientPrimary50}>
        <IPayHeader backBtn title={localizationText.TRANSFER_SUMMARY.TITLE} applyFlex />
        <IPayView style={styles.container}>
          <IPayView>
            <IPayView style={styles.walletBackground}>
              <IPayFlatlist
                style={styles.detailesFlex}
                scrollEnabled={false}
                data={alinmaDetails}
                renderItem={renderWalletPayItem}
              />
            </IPayView>
            <IPayView style={styles.walletBackground}>
              <IPayFlatlist
                style={styles.detailesFlex}
                scrollEnabled={false}
                data={nonAlinmaDetails}
                renderItem={renderNonAlinmaPayItem}
              />
            </IPayView>
          </IPayView>
          <IPayView>
            <IPayButton
              btnType="primary"
              btnIconsDisabled
              btnText={localizationText.COMMON.CONFIRM}
              btnColor={colors.primary.primary500}
              medium
              onPress={() => {
                sendMoneyBottomSheetRef.current?.present();
              }}
            />
          </IPayView>
        </IPayView>
      </IPaySafeAreaView>
      <IPayBottomSheet
        heading={localizationText.HOME.SEND_MONEY}
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={['1%', '99%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={sendMoneyBottomSheetRef}
      >
        <OtpVerificationComponent
          ref={otpVerificationRef}
          testID="otp-verification-bottom-sheet"
          onCallback={() => {
            sendMoneyBottomSheetRef.current?.close();
            navigate(ScreenNames.TOP_UP_SUCCESS, { topupStatus: TopupStatus.SUCCESS, topupChannel: payChannel.WALLET });
          }}
          onPressHelp={handleOnPressHelp}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '95%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent testID="help-center-bottom-sheet" />
      </IPayBottomSheet>
    </>
  );
};

export default TransferSummaryScreen;
