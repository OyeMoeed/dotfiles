import icons from '@app/assets/icons';
import { IPayButton, IPayList } from '@app/components/molecules';
import IPayAddAppleWalletButton from '@app/components/molecules/ipay-add-apple-wallet-button/ipay-add-apple-wallet-button.component';
import IPayCardStatusIndication from '@app/components/molecules/ipay-card-status-indication/ipay-card-status-indication.component';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { TransactionsProp } from '@app/network/services/core/transaction/transaction.interface';
import { getTransactions } from '@app/network/services/core/transaction/transactions.service';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import checkUserAccess from '@app/utilities/check-user-access';
import {
  buttonVariants,
  CardActiveStatus,
  CardCategories,
  CardStatusIndication,
  CardStatusNumber,
  CardStatusType,
} from '@app/utilities/enums.util';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@components/atoms';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IPayFreezeConfirmationSheet from '../ipay-freeze-confirmation-sheet/ipay-freeze-confirmation-sheet.component';
import { IPayCardDetailsSectionProps, Option } from './ipay-card-details-section.interface';
import cardBalanceSectionStyles from './ipay-card-details-section.style';

const IPayCardDetailsSection: React.FC<IPayCardDetailsSectionProps> = ({ testID, onOpenOTPSheet, currentCard }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = cardBalanceSectionStyles(colors);
  const actionSheetRef = useRef<any>(null);
  const [activeCardStatus, setActiveCardStatus] = useState(CardActiveStatus.FREEZE);
  const [statusIndication, setStatusIndication] = useState<CardStatusIndication.ANNUAL | CardStatusIndication.EXPIRY>();
  const [cardStatusType, setCardStatusType] = useState<CardStatusType.ALERT | CardStatusType.WARNING>(
    CardStatusType.WARNING,
  ); // TODO will be updated on the basis of api

  useEffect(() => {
    if (currentCard?.reissueDue && currentCard?.cardStatus !== '450') {
      setStatusIndication(CardStatusIndication.EXPIRY);
    } else if (
      currentCard?.annualFeeDue &&
      currentCard?.cardType !== CardCategories.CLASSIC &&
      currentCard?.cardStatus !== CardStatusNumber?.Expired
    ) {
      setStatusIndication(CardStatusIndication.ANNUAL);
      setCardStatusType(CardStatusType.WARNING);
    } else if (
      currentCard?.annualFeeDue &&
      currentCard?.cardType !== CardCategories.CLASSIC &&
      currentCard?.cardStatus === CardStatusNumber?.Expired
    ) {
      setStatusIndication(CardStatusIndication.ANNUAL);
      setCardStatusType(CardStatusType.ALERT);
    } else {
      setStatusIndication(undefined);
    }
  }, [currentCard]);

  const [isCardPrinted, setIsCardPrinted] = useState();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [transactionsData, setTransactionsData] = useState<IPayTransactionItemProps[]>([]);

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const cardOptions: Option[] = [
    // TODO will be handle on the basis of api
    {
      icon: icons.freeze_icon,
      text: activeCardStatus === CardActiveStatus.FREEZE ? t('CARDS.FREEZE_CARD') : t('CARDS.UNFREEZE_CARD'),
      key: '1',
      onPress: showActionSheet,
    },
    {
      icon: icons.setting_21,
      text: t('CARDS.CARD_OPTIONS'),
      key: '2',
      onPress: () => navigate(ScreenNames.CARD_OPTIONS, { currentCard }),
    },
    {
      icon: icons.info_circle1,
      text: t('CARDS.CARD_DETAILS'),
      key: '3',
      onPress: onOpenOTPSheet,
    },
  ];

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
    setActiveCardStatus(currentCard.frozen ? CardActiveStatus.UNFREEZE : CardActiveStatus.FREEZE);
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
            const hasAccess = checkUserAccess();
            if (hasAccess) {
              navigate(ScreenNames.CARD_RENEWAL, { currentCard, statusIndication });
            }
          }}
          cardStatusType={cardStatusType}
          statusIndication={statusIndication}
        />
      )}
      <IPayView style={styles.accountBalanceContainer}>
        <IPayView style={styles.accountBalanceInnerContainer}>
          <IPayCaption2Text style={styles.accountBalanceText} text="CARDS.ACCOUNT_BALANCE" />
          <IPaySubHeadlineText style={styles.accountBalanceText} shouldTranslate={false}>
            {walletInfo.availableBalance}
            <IPaySubHeadlineText regular text={` ${t('COMMON.SAR')}`} shouldTranslate={false} />
          </IPaySubHeadlineText>
        </IPayView>
        <IPayAddAppleWalletButton selectedCard={currentCard} />
      </IPayView>
      <IPayList
        testID="cashback-list"
        containerStyle={styles.cashbackContainer}
        leftIcon={<IPayIcon color={colors.secondary.secondary500} size={16} icon={icons.discount_shape3} />}
        isShowLeftIcon
        title="CARDS.TOTAL_CASHBACK"
        textStyle={styles.listText}
        leftIconContainerStyles={styles.leftIconStyles}
        rightText={
          <IPaySubHeadlineText style={styles.listText} regular={false} shouldTranslate={false}>
            {currentCard.totalCashbackAmt || '100'} <IPayFootnoteText text="COMMON.SAR" />
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
              const hasAccess = checkUserAccess();
              if (hasAccess) {
                setIsCardPrinted((prevState: any) => ({
                  ...prevState,
                  [currentCard?.id]: true,
                }));
                navigate(ScreenNames.PRINT_CARD_CONFIRMATION, {
                  currentCard,
                });
              }
            }}
            btnType={buttonVariants.PRIMARY}
            leftIcon={<IPayIcon size={18} color={colors.natural.natural0} icon={icons.card} />}
            medium
            btnText="CARDS.PRINT_CARD"
            btnStyle={styles.printBtn}
          />
        )}
      </IPayView>
      <IPayView style={styles.headingsContainer}>
        <IPayView style={styles.commonContainerStyle}>
          <IPayFootnoteText style={styles.footnoteTextStyle} text="CARDS.CARD_TRANSACTIONS_HISTORY" />
        </IPayView>
        <IPayButton
          onPress={() =>
            navigate(ScreenNames.TRANSACTIONS_HISTORY, { currentCard, isShowCard: true, isShowAmount: false })
          }
          btnType={buttonVariants.LINK_BUTTON}
          hasRightIcon
          rightIcon={<IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />}
          medium
          textColor={colors.primary.primary600}
          btnText="COMMON.VIEW_ALL"
          btnStyle={styles.viewAllButtonStyle}
        />
      </IPayView>
      <IPayFlatlist
        testID="transaction"
        data={transactionsData}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <IPayTransactionItem key={`transaction-${index + 1}`} transaction={item} />}
      />
      <IPayFreezeConfirmationSheet
        currentCard={currentCard}
        ref={actionSheetRef}
        setActiveCardStatus={setActiveCardStatus}
      />
    </IPayView>
  );
};

export default IPayCardDetailsSection;
