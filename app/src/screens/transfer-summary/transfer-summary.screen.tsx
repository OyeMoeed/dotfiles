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
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { IW2WResRequest } from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.interface';
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
  const [expandedMessage, setExpandedMessage] = useState<boolean>(false);
  const { alinmaDetails, nonAlinmaDetails, requestMoneySummary, requestMoneySummaryNon } = useConstantData();

  const isItemHasWallet = (item: IW2WResRequest): boolean => {
    const walletNumber = transfersDetails.activeFriends?.filter(
      (activeFriend) => activeFriend?.mobileNumber === item?.mobileNumber,
    )[0]?.walletNumber;

    if (walletNumber == null || !walletNumber) {
      return false;
    }
    return true;
  };

   const filteredAlinmaDetails = alinmaDetails.filter((detail) => {
    if (transactionType === TransactionTypes.SEND_GIFT) {
      return (
        detail.label !== localizationText.TRANSFER_SUMMARY.REASON &&
        detail.label !== localizationText.TRANSFER_SUMMARY.NOTE
      );
    }
    return true;
  });
  function handleNavigation(transactionType) {
    if (transactionType === TransactionTypes.SEND_GIFT) {
      navigate(ScreenNames.TOP_UP_SUCCESS, { topupStatus: TopupStatus.SUCCESS, topupChannel: payChannel.GIFT });
    } else if (transactionType === TransactionTypes.TRANSFER_SEND_MONEY) {
      navigate(ScreenNames.TOP_UP_SUCCESS, { topupStatus: TopupStatus.SUCCESS, topupChannel: payChannel.REQUEST });
    } else {
      navigate(ScreenNames.TOP_UP_SUCCESS, { topupStatus: TopupStatus.SUCCESS, topupChannel: payChannel.MONEY });
    }
  }

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
  function getHeadingForTransactionType(type) {
    switch (type) {
      case TransactionTypes.SEND_GIFT:
        return localizationText.HOME.SEND_GIFT;
      case TransactionTypes.TRANSFER_SEND_MONEY:
        return localizationText.REQUEST_MONEY.CREATE_REQUEST;
      default:
        return localizationText.HOME.SEND_MONEY;
    }
  }
  const transfersRequestsList: any[] = transfersDetails?.fees?.map((item, index) => {
    if (!isItemHasWallet) {
      return [
        {
          id: index,
          label: localizationText.TRANSFER_SUMMARY.NAME,
          value: item?.name,
          leftIcon: icons.user_square,
          color: colors.primary.primary900,
          isAlinma: false,
        },
        {
          id: '2',
          label: localizationText.TRANSFER_SUMMARY.AMOUNT,
          value: `${item.amount} ${localizationText.COMMON.SAR}`,
        },
      ];
    }

    return [
      {
        id: '1',
        label: localizationText.TRANSFER_SUMMARY.NAME,
        value: item?.name,
        leftIcon: images.alinmaP,
        isAlinma: true,
      },
      {
        id: '2',
        label: localizationText.TRANSFER_SUMMARY.AMOUNT,
        value: `${item.amount} ${localizationText.COMMON.SAR}`,
      },
    ];
  });

  const renderWalletPayItem = ({ item }) => {
    const renderLeftIcon = () => {
      if (item.leftIcon) {
        if (item.isAlinma) {
          return (
            <IPayView style={styles.leftIcon}>
              <IPayImage image={images.alinmaP} style={styles.alinmaLogo} resizeMode="contain" />
            </IPayView>
          );
        }
        return (
          <IPayPressable style={styles.appleIcon} onPress={item.onPress}>
            <IPayIcon
              icon={icons.user_square}
              style={styles.appleIcon}
              color={colors.primary.primary900}
              size={scaleSize(18)}
            />
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
        <IPayHeader
          backBtn
          title={
            transactionType === TransactionTypes.TRANSFER_SEND_MONEY
              ? localizationText.REQUEST_SUMMARY.SUMMARY
              : localizationText.TRANSFER_SUMMARY.TITLE
          }
          applyFlex
        />
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
                data={
                  transactionType === TransactionTypes.TRANSFER_SEND_MONEY ? requestMoneySummary : filteredAlinmaDetails
                }
                renderItem={renderWalletPayItem}
              />
            </IPayView>
            <IPayView style={styles.walletBackground}>
              <IPayFlatlist
                style={styles.detailesFlex}
                scrollEnabled={false}
                data={
                  transactionType === TransactionTypes.TRANSFER_SEND_MONEY
                    ? requestMoneySummaryNon
                    : filteredNonAlinmaDetails
                }
                renderItem={renderNonAlinmaPayItem}
              />
            </IPayView>
          </IPayView>
        </IPayScrollView>
        <IPayView style={styles.buttonContainer}>
          {/* Crashed inside wallet to wallet transfer */}
          {/* {transactionType === TransactionTypes.SEND_GIFT && (
            <IPayList
              title={localizationText.TRANSACTION_HISTORY.TOTAL_AMOUNT}
              showDetail
              detailText={`${transfersDetails?.formInstances?.[0]?.totalAmount} ${localizationText.COMMON.SAR}`}
            />
          )} */}
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnIconsDisabled
            btnText={localizationText.COMMON.CONFIRM}
            btnColor={colors.primary.primary500}
            large
            onPress={onSubmit}
            btnStyle={styles.confirmButton}
          />
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        heading={getHeadingForTransactionType(transactionType)}
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
            handleNavigation(transactionType);
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
