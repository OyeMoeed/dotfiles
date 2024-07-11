import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayButton, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import historyData from '@app/screens/transaction-history/transaction-history.constant';
import useTheme from '@app/styles/hooks/theme.hook';
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
import React from 'react';
import { IPayCardDetailsSectionProps, Option } from './ipay-card-details-section.interface';
import cardBalanceSectionStyles from './ipay-card-details-section.style';

const IPayCardDetailsSection: React.FC<IPayCardDetailsSectionProps> = ({ testID }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = cardBalanceSectionStyles(colors);
  const isAdded = false; // TODO will be handle on the basis of api
  const cashbackAmount = '120.00'; // TODO will be updated on the basis of api
  const balance = '5,200.40'; // TODO will be updated on the basis of api
  const isExpired = false; // TODO will be updated on the basis of api
  const expiryDate = '12 May 2024'; // TODO will be updated on the basis of api

  const cardOptions: Option[] = [
    // TODO will be handle on the basis of api
    {
      icon: icons.freeze_icon,
      text: localizationText.CARDS.FREEZE_CARD,
      key: '1',
    },
    {
      icon: icons.setting_21,
      text: localizationText.CARDS.CARD_OPTIONS,
      key: '2',
    },
    {
      icon: icons.info_circle1,
      text: localizationText.CARDS.CARD_DETAILS,
      key: '3',
    },
  ];

  const renderItem = (item: Option) => (
    <IPayView style={styles.cardOptionWrapper}>
      <IPayView style={styles.cardOption}>
        <IPayIcon icon={item.icon} size={28} color={colors.primary.primary500} />
      </IPayView>
      <IPayCaption2Text style={styles.optionText}>{item.text}</IPayCaption2Text>
    </IPayView>
  );

  return (
    <IPayView testID={testID} style={styles.mainContainer}>
      <IPayList
        testID="expiry-list "
        containerStyle={[styles.cardExpiryContainer, isExpired && styles.expiredBg]}
        leftIcon={<IPayIcon size={20} icon={isExpired ? icons.warning2 : icons.timer} />}
        isShowSubTitle
        subTitle={isExpired ? localizationText.CARDS.PLEASE_RENEW_CARD : `${localizationText.COMMON.ON} ${expiryDate}`}
        subTextStyle={[styles.expirySubTitle, isExpired && styles.expiredTextColor]}
        leftIconContainerStyles={styles.expiryLeftContainer}
        isShowLeftIcon
        title={isExpired ? localizationText.CARDS.CARD_EXPIRED : localizationText.CARDS.EXPIRING_SOON}
        textStyle={[styles.expiryTitle, isExpired && styles.expiredTextColor]}
        rightText={<IPayButton btnType="primary" btnIconsDisabled medium btnText={localizationText.CARDS.RENEW_CARD} />}
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
        containerStyle={styles.cashbackContainer}
        leftIcon={<IPayIcon color={colors.secondary.secondary500} size={16} icon={icons.discount_shape3} />}
        isShowLeftIcon
        title={localizationText.CARDS.TOTAL_CASHBACK}
        textStyle={styles.listText}
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
    </IPayView>
  );
};
export default IPayCardDetailsSection;
