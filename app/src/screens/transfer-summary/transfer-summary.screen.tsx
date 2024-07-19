import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader, IPayList } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { TopupStatus } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import giftMessageMockData from './transfer-summary.mock';
import transferSummaryStyles from './transfer-summary.styles';

const TransferSummaryScreen: React.FC = ({ transactionType }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = transferSummaryStyles(colors);
  const sendMoneyBottomSheetRef = useRef<any>(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
  const filteredAlinmaDetails = alinmaDetails.filter((detail) => {
    if (transactionType === TransactionTypes.SEND_GIFT) {
      return detail.id !== '3' && detail.id !== '4';
    }
    return true;
  });
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

  const filteredNonAlinmaDetails = nonAlinmaDetails.filter((detail) => {
    if (transactionType === TransactionTypes.SEND_GIFT) {
      return detail.id !== '3' && detail.id !== '4';
    }
    return true;
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const giftMessage = ({ item, index }: { item: any; index: number }) => (
    <IPayView style={styles.faqItemContainer}>
      <IPayPressable onPress={() => toggleExpand(index)} style={styles.faqItemHeader}>
        <IPayView style={styles.listView}>
          <IPayFootnoteText regular style={styles.faqItemText}>
            {item.question}
          </IPayFootnoteText>
          <IPayIcon
            icon={icons.ARROW_DOWN}
            size={18}
            style={expandedIndex === index ? styles.faqItemIconExpanded : styles.faqItemIcon}
          />
        </IPayView>
      </IPayPressable>
      {expandedIndex === index && (
        <IPayCaption1Text regular style={styles.faqItemAnswer}>
          {item.answer}
        </IPayCaption1Text>
      )}
    </IPayView>
  );

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
        {transactionType === TransactionTypes.SEND_GIFT && (
          <IPayView style={styles.reasonContainer}>
            <IPayList
              title={localizationText.SEND_GIFT_SUMMARY.OCCASION}
              showDetail
              detailText={localizationText.SEND_GIFT_SUMMARY.EIYDIAH}
            />
            <IPayFlatlist renderItem={giftMessage} data={giftMessageMockData} style={styles.detailesFlex} />
          </IPayView>
        )}
        <IPayView style={styles.container}>
          <IPayView>
            <IPayView style={styles.walletBackground}>
              <IPayFlatlist
                style={styles.detailesFlex}
                scrollEnabled={false}
                data={filteredAlinmaDetails}
                renderItem={renderWalletPayItem}
              />
            </IPayView>
            <IPayView style={styles.walletBackground}>
              <IPayFlatlist
                style={styles.detailesFlex}
                scrollEnabled={false}
                data={filteredNonAlinmaDetails}
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
        customSnapPoint={['1%', '95%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={sendMoneyBottomSheetRef}
      >
        <OtpVerificationComponent
          ref={otpVerificationRef}
          testID="otp-verification-bottom-sheet"
          onCallback={() => {
            sendMoneyBottomSheetRef.current?.close();
            navigate(ScreenNames.TOP_UP_SUCCESS, { topupStatus: TopupStatus.SUCCESS });
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
