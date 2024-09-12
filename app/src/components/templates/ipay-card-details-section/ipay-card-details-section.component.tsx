import icons from '@app/assets/icons';
import { IPayButton, IPayList } from '@app/components/molecules';
import IPayAddAppleWalletButton from '@app/components/molecules/ipay-add-apple-wallet-button/ipay-add-apple-wallet-button.component';
import IPayCardStatusIndication from '@app/components/molecules/ipay-card-status-indication/ipay-card-status-indication.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { CardStatusReq } from '@app/network/services/cards-management/card-status/card-status.interface';
import changeCardStatus from '@app/network/services/cards-management/card-status/card-status.service';
import { TransactionsProp } from '@app/network/services/core/transaction/transaction.interface';
import { getTransactions } from '@app/network/services/core/transaction/transactions.service';
import { getDeviceInfo } from '@app/network/utilities';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import {
  buttonVariants,
  CardActiveStatus,
  CardStatusIndication,
  CardStatusNumber,
  CardStatusType,
  ToastTypes,
} from '@app/utilities/enums.util';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayText,
  IPayView,
} from '@components/atoms';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  IPayCardDetailsSectionProps,
  Option,
  SheetVariants,
  ToastVariants,
} from './ipay-card-details-section.interface';
import cardBalanceSectionStyles from './ipay-card-details-section.style';

const IPayCardDetailsSection: React.FC<IPayCardDetailsSectionProps> = ({
  testID,
  onOpenOTPSheet,
  currentCard,
  cards,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const styles = cardBalanceSectionStyles(colors);
  const actionSheetRef = useRef<any>(null);
  const actionTypeRef = useRef(CardActiveStatus.FREEZE); // TODO will be updated on the basis of api
  const [statusIndication, setStatusIndication] = useState<CardStatusIndication.ANNUAL | CardStatusIndication.EXPIRY>();

  useEffect(() => {
    if (currentCard?.reissueDue && currentCard?.cardStatus !== '450') {
      setStatusIndication(CardStatusIndication.EXPIRY);
    } else if (currentCard?.reissueDue && currentCard?.cardStatus === '400') {
      setStatusIndication(CardStatusIndication.ANNUAL);
    } else {
      setStatusIndication(undefined);
    }
  }, [currentCard]);

  const cardStatusType = currentCard?.expired || currentCard?.suspended ? CardStatusType.ALERT : CardStatusType.WARNING; // TODO will be updated on the basis of api

  const [isCardPrinted, setIsCardPrinted] = useState();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [transactionsData, setTransactionsData] = useState<IPayTransactionItemProps[]>([]);

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
      text:
        actionTypeRef.current === CardActiveStatus.FREEZE
          ? localizationText.CARDS.FREEZE_CARD
          : localizationText.CARDS.UNFREEZE_CARD,
      key: '1',
      onPress: showActionSheet,
    },
    {
      icon: icons.setting_21,
      text: localizationText.CARDS.CARD_OPTIONS,
      key: '2',
      onPress: () => navigate(ScreenNames.CARD_OPTIONS, { currentCard }),
    },
    {
      icon: icons.info_circle1,
      text: localizationText.CARDS.CARD_DETAILS,
      key: '3',
      onPress: onOpenOTPSheet,
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
        toastType: ToastTypes.SUCCESS,
        icon: icons.snow_flake1,
      },
      unfreeze: {
        title: localizationText.CARDS.CARD_UNFREEZE_MESSAGE,
        toastType: ToastTypes.SUCCESS,
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

  const onFreezeCard = (type: string) => {
    if (CardActiveStatus.FREEZE === type) {
      actionTypeRef.current = CardActiveStatus.UNFREEZE;
    } else {
      actionTypeRef.current = CardActiveStatus.FREEZE;
    }
  };

  const onFreeze = async (type: string) => {
    const cardStatusPayload: CardStatusReq = {
      status:
        type.toLowerCase() === CardActiveStatus.UNFREEZE
          ? CardStatusNumber.ActiveWithOnlinePurchase
          : CardStatusNumber.Freezed,
      cardIndex: currentCard?.cardIndex,
      deviceInfo: await getDeviceInfo(),
    };

    const apiResponse = await changeCardStatus(walletInfo.walletNumber, cardStatusPayload);
    if (apiResponse?.status?.type === 'SUCCESS') {
      actionSheetRef.current.hide();
      onFreezeCard(type.toLowerCase());
      // TODO: Fix props reassign
      // eslint-disable-next-line no-param-reassign
      currentCard.frozen = apiResponse.response?.cardInfo.cardStatus === CardStatusNumber.Freezed;

      actionTypeRef.current =
        apiResponse.response?.cardInfo.cardStatus === CardStatusNumber.Freezed
          ? CardActiveStatus.UNFREEZE
          : CardActiveStatus.FREEZE;
      setTimeout(() => {
        renderToast(`${localizationText.CARDS.DEBIT_CARD} ${currentCard.maskedCardNumber}`, type.toLowerCase());
      }, 500);
      return;
    }

    actionSheetRef.current.hide();
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

  const getTransactionsData = async () => {
    const payload: TransactionsProp = {
      walletNumber: walletInfo.walletNumber,
      maxRecords: '10',
      offset: '1',
      cardIndex: currentCard?.cardIndex,
      fromDate: '',
      toDate: '',
    };
    const apiResponse: any = await getTransactions(payload);

    if (apiResponse) {
      setTransactionsData(apiResponse?.response?.transactions);
    }
  };

  useEffect(() => {
    getTransactionsData();
    actionTypeRef.current = currentCard.frozen ? CardActiveStatus.UNFREEZE : CardActiveStatus.FREEZE;
  }, [currentCard]);

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
      {statusIndication && (
        <IPayCardStatusIndication
          currentCard={currentCard}
          onPress={() => {
            navigate(ScreenNames.CARD_RENEWAL, { currentCard });
          }}
          cardStatusType={cardStatusType}
          statusIndication={statusIndication}
        />
      )}
      <IPayView style={styles.accountBalanceContainer}>
        <IPayView style={styles.accountBalanceInnerContainer}>
          <IPayCaption2Text style={styles.accountBalanceText}>
            {localizationText.CARDS.ACCOUNT_BALANCE}
          </IPayCaption2Text>
          <IPaySubHeadlineText style={styles.accountBalanceText}>
            {walletInfo.availableBalance}
            <IPaySubHeadlineText regular>{localizationText.COMMON.SAR}</IPaySubHeadlineText>
          </IPaySubHeadlineText>
        </IPayView>
        <IPayAddAppleWalletButton selectedCard={currentCard} />
      </IPayView>
      <IPayList
        testID="cashback-list"
        containerStyle={styles.cashbackContainer}
        leftIcon={<IPayIcon color={colors.secondary.secondary500} size={16} icon={icons.discount_shape3} />}
        isShowLeftIcon
        title={localizationText.CARDS.TOTAL_CASHBACK}
        textStyle={styles.listText}
        leftIconContainerStyles={styles.leftIconStyles}
        rightText={
          <IPaySubHeadlineText style={styles.listText} regular={false}>
            {currentCard.totalCashbackAmt} <IPayFootnoteText>{localizationText.COMMON.SAR}</IPayFootnoteText>
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
        {!isCardPrinted && (
          <IPayButton
            onPress={() => {
              setIsCardPrinted((prevState) => ({
                ...prevState,
                [currentCard.id]: true,
              }));
              navigate(ScreenNames.PRINT_CARD_CONFIRMATION, {
                currentCard,
              });
            }}
            btnType={buttonVariants.PRIMARY}
            leftIcon={<IPayIcon size={18} color={colors.natural.natural0} icon={icons.card} />}
            medium
            btnText={localizationText.CARDS.PRINT_CARD}
            btnStyle={styles.printBtn}
          />
        )}
      </IPayView>
      <IPayView style={styles.headingsContainer}>
        <IPayView style={styles.commonContainerStyle}>
          <IPayFootnoteText style={styles.footnoteTextStyle}>
            {localizationText.CARDS.CARD_TRANSACTIONS_HISTORY}
          </IPayFootnoteText>
        </IPayView>
        <IPayPressable
          onPress={() =>
            navigate(ScreenNames.TRANSACTIONS_HISTORY, {
              isShowCard: true,
              currentCard,
              cards,
              isShowAmount: true,
            })
          }
          style={styles.commonContainerStyle}
        />
        <IPaySubHeadlineText regular style={styles.subheadingTextStyle}>
          {localizationText.COMMON.VIEW_ALL}
        </IPaySubHeadlineText>
        <IPayPressable
          onPress={() => navigate(ScreenNames.TRANSACTIONS_HISTORY, { currentCard, cards, isShowAmount: false })}
        >
          <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.VIEW_ALL}</IPayText>
          <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
        </IPayPressable>
      </IPayView>
      <IPayFlatlist
        testID="transaction"
        data={transactionsData}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <IPayTransactionItem key={`transaction-${index + 1}`} transaction={item} />}
      />
      <IPayActionSheet
        ref={actionSheetRef}
        bodyStyle={styles.actionSheetStyle}
        options={[sheetVariant[actionTypeRef.current as keyof SheetVariants].option, localizationText.COMMON.CANCEL]}
        cancelButtonIndex={1}
        onPress={(index) => handleFinalAction(index, sheetVariant[actionTypeRef.current as keyof SheetVariants].option)}
        showCancel
        testID="action-sheet"
        showIcon
        customImage={<IPayIcon size={48} icon={sheetVariant[actionTypeRef.current as keyof SheetVariants].icon} />}
        title={sheetVariant[actionTypeRef.current as keyof SheetVariants].title}
        message={sheetVariant[actionTypeRef.current as keyof SheetVariants].subtitle}
      />
    </IPayView>
  );
};
export default IPayCardDetailsSection;
