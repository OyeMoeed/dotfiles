import icons from '@app/assets/icons';
import { IPayButton, IPayList } from '@app/components/molecules';
import IPayAddAppleWalletButton from '@app/components/molecules/ipay-add-apple-wallet-button/ipay-add-apple-wallet-button.component';
import IPayCardStatusIndication from '@app/components/molecules/ipay-card-status-indication/ipay-card-status-indication.component';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useGetTransactions from '@app/network/services/core/transaction/useGetTransactions';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IPayFreezeConfirmationSheet from '../ipay-freeze-confirmation-sheet/ipay-freeze-confirmation-sheet.component';
import { IPayCardDetailsSectionProps, Option } from './ipay-card-details-section.interface';
import cardBalanceSectionStyles from './ipay-card-details-section.style';

const IPayCardDetailsSection: React.FC<IPayCardDetailsSectionProps> = ({ testID, onOpenOTPSheet }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = cardBalanceSectionStyles(colors);
  const currentCard = useTypedSelector((state) => state.cardsReducer.currentCard);

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

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

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
      hidden: false,
    },
    {
      icon: icons.setting_21,
      text: t('CARDS.CARD_OPTIONS'),
      key: '2',
      onPress: () => navigate(ScreenNames.CARD_OPTIONS),
      hidden: false,
    },
    {
      icon: icons.info_circle1,
      text: t('CARDS.CARD_DETAILS'),
      key: '3',
      onPress: onOpenOTPSheet,
      hidden: currentCard?.frozen,
    },
  ];

  const { isLoadingTransactions, transactionsData } = useGetTransactions({
    payload: {
      walletNumber: walletInfo.walletNumber,
      maxRecords: '10',
      offset: '1',
      cardIndex: currentCard?.cardIndex,
      fromDate: '',
      toDate: '',
    },
  });

  useEffect(() => {
    setActiveCardStatus(currentCard?.frozen ? CardActiveStatus.UNFREEZE : CardActiveStatus.FREEZE);
  }, [currentCard]);

  const renderItem = (item: Option) => {
    if (item?.hidden) {
      return null;
    }

    return (
      <IPayPressable onPress={item.onPress}>
        <IPayView style={styles.cardOptionWrapper}>
          <IPayView style={styles.cardOption}>
            <IPayIcon icon={item.icon} size={28} color={colors.primary.primary500} />
          </IPayView>
          <IPayCaption2Text style={styles.optionText}>{item.text}</IPayCaption2Text>
        </IPayView>
      </IPayPressable>
    );
  };

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingTransactions) {
      return <IPaySkeletonBuilder variation={IPaySkeletonEnums.TRANSACTION_LIST} isLoading={isLoadingTransactions} />;
    }
    return null;
  }, [isLoadingTransactions]);

  return (
    <IPayView testID={testID} style={styles.mainContainer}>
      {statusIndication && (
        <IPayCardStatusIndication
          onPress={() => {
            const hasAccess = checkUserAccess();
            if (hasAccess) {
              navigate(ScreenNames.CARD_RENEWAL, { statusIndication });
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
            {currentCard?.totalCashbackAmt || '100'} <IPayFootnoteText text="COMMON.SAR" />
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
        {!currentCard?.physicalCard && (
          <IPayButton
            onPress={() => {
              const hasAccess = checkUserAccess();
              if (hasAccess) {
                // setIsCardPrinted((prevState: any) => ({
                //   ...prevState,
                //   [currentCard?.cardIndex || '']: true,
                // }));
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
            navigate(ScreenNames.TRANSACTIONS_HISTORY, { currentCard, isShowCard: true, isShowAmount: true })
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
        ListEmptyComponent={ListEmptyComponent}
      />
      <IPayFreezeConfirmationSheet ref={actionSheetRef} setActiveCardStatus={setActiveCardStatus} />
    </IPayView>
  );
};

export default IPayCardDetailsSection;
