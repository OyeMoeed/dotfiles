import icons from '@app/assets/icons';
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
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { TopupStatus, buttonVariants, payChannel } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import { GiftItem } from './transfer-summary-screen.interface';
import giftMessageMockData from './transfer-summary.mock';
import transferSummaryStyles from './transfer-summary.styles';

const TransferSummaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const route = useRoute();
  const { transactionType } = route.params;
  const styles = transferSummaryStyles(colors);
  const sendMoneyBottomSheetRef = useRef<any>(null);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { alinmaDetails, nonAlinmaDetails } = useConstantData();
  const amount = '1000';

  const filteredAlinmaDetails = alinmaDetails.filter((detail) => {
    if (transactionType === TransactionTypes.SEND_GIFT) {
      return (
        detail.label !== localizationText.TRANSFER_SUMMARY.REASON &&
        detail.label !== localizationText.TRANSFER_SUMMARY.NOTE
      );
    }
    return true;
  });

  const filteredNonAlinmaDetails = nonAlinmaDetails.filter((detail) => {
    if (transactionType === TransactionTypes.SEND_GIFT) {
      return (
        detail.label !== localizationText.TRANSFER_SUMMARY.REASON &&
        detail.label !== localizationText.TRANSFER_SUMMARY.NOTE
      );
    }
    return true;
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const giftMessage = ({ item }: { item: GiftItem }) => {
    const { question, answer, index } = item;

    return (
      <IPayView style={styles.faqItemContainer}>
        <IPayPressable onPress={() => toggleExpand(index)} style={styles.faqItemHeader}>
          <IPayView style={styles.listView}>
            <IPayFootnoteText regular style={styles.faqItemText}>
              {question}
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
            {answer}
          </IPayCaption1Text>
        )}
      </IPayView>
    );
  };

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
            <IPayIcon icon={item.leftIcon} style={styles.appleIcon} color={item.color} size={18} />
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
        <>
          {transactionType === TransactionTypes.SEND_GIFT && (
            <IPayView style={styles.reasonContainer}>
              <IPayList
                title={localizationText.SEND_GIFT_SUMMARY.OCCASION}
                showDetail
                detailTextStyle={styles.listTextStyle}
                detailText={localizationText.SEND_GIFT_SUMMARY.EIYDIAH}
              />
              <IPayFlatlist renderItem={giftMessage} data={giftMessageMockData} style={styles.detailesFlex} />
            </IPayView>
          )}
        </>
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
          <IPayView style={styles.buttonContainer}>
            {transactionType === TransactionTypes.SEND_GIFT && (
              <IPayList
                title={localizationText.TRANSACTION_HISTORY.TOTAL_AMOUNT}
                showDetail
                detailTextStyle={styles.listTextStyle}
                detailText={`${amount} ${localizationText.COMMON.SAR}`}
              />
            )}
            <IPayButton
              btnType={buttonVariants.PRIMARY}
              btnIconsDisabled
              btnText={localizationText.COMMON.CONFIRM}
              btnColor={colors.primary.primary500}
              large
              onPress={() => {
                sendMoneyBottomSheetRef.current?.present();
              }}
            />
          </IPayView>
        </IPayView>
      </IPaySafeAreaView>
      <IPayBottomSheet
        heading={
          transactionType === TransactionTypes.SEND_GIFT
            ? localizationText.HOME.SEND_GIFT
            : localizationText.HOME.SEND_MONEY
        }
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
            navigate(ScreenNames.TOP_UP_SUCCESS, { topupStatus: TopupStatus.SUCCESS, topupChannel: payChannel.GIFT });
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
