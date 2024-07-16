import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayButton, IPayList } from '@app/components/molecules';
import IPayCardStatusIndication from '@app/components/molecules/ipay-card-status-indication/ipay-card-status-indication.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import historyData from '@app/screens/transaction-history/transaction-history.constant';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardActiveStatus, CardStatusIndication, CardStatusType, toastTypes } from '@app/utilities/enums.util';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@components/atoms';
import React, { useCallback, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import {
  IPayCardDetailsSectionProps,
  Option,
  SheetVariants,
  ToastVariants,
} from './ipay-card-details-section.interface';
import cardBalanceSectionStyles from './ipay-card-details-section.style';
import ScreenNames from '@app/navigation/screen-names.navigation';

const IPayCardDetailsSection: React.FC<IPayCardDetailsSectionProps> = ({ testID }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const styles = cardBalanceSectionStyles(colors);
  const actionSheetRef = useRef<any>(null);
  const isAdded = false; // TODO will be handle on the basis of api
  const cashbackAmount = '120.00'; // TODO will be updated on the basis of api
  const balance = '5,200.40'; // TODO will be updated on the basis of api
  const isExpired = true; // TODO will be updated on the basis of api
  const statusIndication = !isExpired ? CardStatusIndication.ANNUAL : CardStatusIndication.EXPIRY; // TODO will be updated on the basis of api
  const cardStatusType = CardStatusType.WARNING; // TODO will be updated on the basis of api

  const [actionType, setActionType] = useState<string>(CardActiveStatus.FREEZE); // TODO will be updated on the basis of api

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const hideActionSheet = () => {
    setTimeout(() => {
      actionSheetRef.current.hide();
    }, 500); // Delay for closing sheet
  };

  const cardOptions: Option[] = [
    // TODO will be handle on the basis of api
    {
      icon: icons.freeze_icon,
      text: localizationText.CARDS.FREEZE_CARD,
      key: '1',
      onPress: showActionSheet,
    },
    {
      icon: icons.setting_21,
      text: localizationText.CARDS.CARD_OPTIONS,
      key: '2',
      onPress: () => navigate(ScreenNames.CARD_OPTIONS),
    },
    {
      icon: icons.info_circle1,
      text: localizationText.CARDS.CARD_DETAILS,
      key: '3',
    },
  ];

  const sheetVariant: SheetVariants = {
    freeze: {
      title: localizationText.CARDS.FREEZE_CARD,
      subtitle: localizationText.CARDS.CARD_FREEZE_INDICATION_MESSAGE,
      option: localizationText.CARDS.FREEZE,
      icon: icons.cardSlash1,
    },
    unfreeze: {
      title: localizationText.CARDS.UNFREEZE_CARD,
      subtitle: localizationText.CARDS.CARD_UNFREEZE_INDICATION_MESSAGE,
      option: localizationText.CARDS.UNFREEZE,
      icon: icons.card_tick11,
    },
  };

  const renderToast = (toastMsg: string, type: string) => {
    const toastVariant: ToastVariants = {
      freeze: {
        title: localizationText.CARDS.CARD_FREEZE_MESSAGE,
        toastType: toastTypes.SUCCESS,
        icon: icons.snow_flake1,
      },
      unfreeze: {
        title: localizationText.CARDS.CARD_UNFREEZE_MESSAGE,
        toastType: toastTypes.SUCCESS,
        icon: icons.snow_flake1,
      },
    };
    showToast({
      title: toastVariant[type as keyof ToastVariants].title,
      subTitle: toastMsg,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: (
        <IPayIcon icon={toastVariant[type as keyof ToastVariants].icon} size={24} color={colors.natural.natural0} />
      ),
      toastType: toastVariant[type as keyof ToastVariants].toastType,
    });
  };

  const onFreeze = (type: string) => {
    actionSheetRef.current.hide();
    setActionType(type.toLowerCase());
    setTimeout(() => {
      renderToast(localizationText.CARDS.DEBIT_CARD, type.toLowerCase());
    }, 500);
  };

  const handleFinalAction = useCallback((index: number, type: string) => {
    switch (index) {
      case 0:
        onFreeze(type);
        break;
      case 1:
        hideActionSheet();
        break;
      default:
        break;
    }
  }, []);

  const renderItem = (item: Option) => (
    <IPayPressable onPress={item.onPress}>
      <IPayView style={styles.cardOptionWrapper}>
        <IPayView style={styles.cardOption}>
          <IPayIcon icon={item.icon} size={28} color={colors.primary.primary500} />
        </IPayView>
        <IPayCaption2Text style={styles.optionText}>{item.text}</IPayCaption2Text>
      </IPayView>
    </IPayPressable>
  );

  return (
    <IPayView testID={testID} style={styles.mainContainer}>
      <IPayCardStatusIndication
        onPress={() => {
          navigate(ScreenNames.CARD_RENEWAL);
        }}
        cardStatusType={cardStatusType}
        statusIndication={statusIndication}
      />
      <IPayView style={styles.accountBalanceContainer}>
        <IPayView style={styles.accountBalanceInnerContainer}>
          <IPayCaption2Text style={styles.accountBalanceText}>
            {localizationText.CARDS.ACCOUNT_BALANCE}
          </IPayCaption2Text>
          <IPaySubHeadlineText style={styles.accountBalanceText}>
            {balance} <IPaySubHeadlineText regular>{localizationText.COMMON.SAR}</IPaySubHeadlineText>
          </IPaySubHeadlineText>
        </IPayView>
        {isAdded ? (
          <IPayView style={styles.addedAppleWalletWrapper}>
            <IPayView style={styles.appleWalletTextWrapper}>
              <IPayCaption2Text style={styles.addedText} regular>
                {localizationText.CARDS.ADDED_TO}
              </IPayCaption2Text>
              <IPayCaption2Text regular={false}>{localizationText.CARDS.APPLE_WALLET}</IPayCaption2Text>
            </IPayView>
            <IPayView style={styles.applePay}>
              <IPayIcon icon={icons.apple_pay} size={28} color={colors.natural.natural900} />
            </IPayView>
          </IPayView>
        ) : (
          <IPayImage image={images.appleWallet} style={styles.appleWalletImg} />
        )}
      </IPayView>
      <IPayList
        testID="cashback-list"
        containerStyle={styles.cashbackContainer as ViewStyle}
        leftIcon={<IPayIcon color={colors.secondary.secondary500} size={16} icon={icons.discount_shape3} />}
        isShowLeftIcon
        title={localizationText.CARDS.TOTAL_CASHBACK}
        textStyle={styles.listText}
        leftIconContainerStyles={styles.leftIconStyles as ViewStyle}
        rightText={
          <IPaySubHeadlineText style={styles.listText} regular={false}>
            {cashbackAmount} <IPayFootnoteText>{localizationText.COMMON.SAR}</IPayFootnoteText>
          </IPaySubHeadlineText>
        }
      />
      <IPayView style={styles.carOptionsContainer}>
        <IPayFlatlist
          horizontal
          data={cardOptions}
          style={styles.flatlist}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.key.toString()}
          contentContainerStyle={styles.flatlistContainerStyle}
        />
        <IPayButton
          btnType="primary"
          leftIcon={<IPayIcon size={18} color={colors.natural.natural0} icon={icons.card} />}
          medium
          btnText={localizationText.CARDS.PRINT_CARD}
        />
      </IPayView>
      <IPayView style={styles.headingsContainer}>
        <IPayView style={styles.commonContainerStyle}>
          <IPayFootnoteText style={styles.footnoteTextStyle}>
            {localizationText.HOME.CARDS} {localizationText.COMMON.TRANSACTION_HISTORY}
          </IPayFootnoteText>
        </IPayView>
        <IPayView style={styles.commonContainerStyle}>
          <IPaySubHeadlineText regular style={styles.subheadingTextStyle}>
            {localizationText.COMMON.VIEW_ALL}
          </IPaySubHeadlineText>
          <IPayPressable onPress={() => navigate(screenNames.TRANSACTIONS_HISTORY, {})}>
            <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
          </IPayPressable>
        </IPayView>
      </IPayView>
      <IPayFlatlist
        testID="transaction"
        data={historyData.slice(0, 3)}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <IPayTransactionItem key={`transaction-${index + 1}`} transaction={item} />}
      />
      <IPayActionSheet
        ref={actionSheetRef}
        options={[sheetVariant[actionType as keyof SheetVariants].option, localizationText.COMMON.CANCEL]}
        cancelButtonIndex={1}
        onPress={(index) => handleFinalAction(index, sheetVariant[actionType as keyof SheetVariants].option)}
        showCancel
        testID="action-sheet"
        showIcon
        customImage={<IPayIcon size={48} icon={sheetVariant[actionType as keyof SheetVariants].icon} />}
        title={sheetVariant[actionType as keyof SheetVariants].title}
        message={sheetVariant[actionType as keyof SheetVariants].subtitle}
      />
    </IPayView>
  );
};
export default IPayCardDetailsSection;
