import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayAmountInput, IPayButton, IPayHeader, IPayList, IPayTopUpBox } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPayRemainingAccountBalance } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import { formatNumberWithCommas, removeCommas } from '@app/utilities/number-helper.util';
import { useEffect, useState } from 'react';
import { Contact } from 'react-native-contacts';
import sendGiftAmountStyles from './send-gift-amount.style';

const SendGiftAmountScreen = ({ route }) => {
  const { selectedContacts } = route.params;
  const localizationText = useLocalization();
  const [topUpAmount, setTopUpAmount] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactAmounts, setContactAmounts] = useState<{ [key: string]: string }>({});

  const GIFT_TABS = [
    localizationText.SEND_GIFT.EQUALLY,
    localizationText.SEND_GIFT.SPLIT,
    localizationText.SEND_GIFT.MANUAL,
  ];

  const { colors } = useTheme();
  const styles = sendGiftAmountStyles(colors);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { currentBalance } = walletInfo; // TODO replace with original data
  const [selectedTab, setSelectedTab] = useState<string>(GIFT_TABS[0]);
  const [chipValue, setChipValue] = useState('');

  useEffect(() => {
    setContacts(selectedContacts);
  }, [selectedContacts]);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const { monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount, dailyOutgoingLimit } = walletInfo.limitsDetails;
  useEffect(() => {
    const monthlyRemaining = parseFloat(monthlyRemainingOutgoingAmount);
    const dailyRemaining = parseFloat(dailyRemainingOutgoingAmount);
    const updatedTopUpAmount = parseFloat(removeCommas(topUpAmount));

    switch (true) {
      case monthlyRemaining === 0:
        setChipValue(localizationText.TOP_UP.LIMIT_REACHED);
        break;
      case updatedTopUpAmount > dailyRemaining && updatedTopUpAmount < monthlyRemaining:
        setChipValue(`${localizationText.TOP_UP.DAILY_LIMIT} ${dailyOutgoingLimit} SAR`);
        break;
      case updatedTopUpAmount > monthlyRemaining:
        setChipValue(localizationText.TOP_UP.AMOUNT_EXCEEDS_CURRENT);
        break;
      default:
        setChipValue('');
        break;
    }
  }, [topUpAmount, monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount, dailyOutgoingLimit, localizationText]);

  const handleContactAmountChange = (text: string, contactId: string) => {
    const newAmount = removeCommas(text);
    const reg = regex.NUMBERS_ONLY;
    if (reg.test(newAmount)) {
      setContactAmounts((prevAmounts) => ({
        ...prevAmounts,
        [contactId]: newAmount,
      }));
    }
  };

  const calculateAmountPerContact = () => {
    if (contacts.length === 0 || topUpAmount === '') {
      return '0';
    }
    const amountPerContact = parseFloat(topUpAmount) / contacts.length;
    return amountPerContact.toFixed(2);
  };

  // Handle removing the contact from recipient
  const handleRemoveContact = (contactId: string) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.recordID !== contactId));
    setContactAmounts((prevAmounts) => {
      const remainingAmounts = Object.fromEntries(Object.entries(prevAmounts).filter(([key]) => key !== contactId));
      return remainingAmounts;
    });
  };

  const renderItem = ({ item }: { item: Contact }) => {
    const { givenName, recordID } = item;
    let detailText = `${topUpAmount} ${localizationText.COMMON.SAR}`;

    if (selectedTab === localizationText.SEND_GIFT.SPLIT && contacts.length > 0) {
      detailText = `${calculateAmountPerContact()} ${localizationText.COMMON.SAR}`;
    }

    return (
      <IPayView>
        {selectedTab === localizationText.SEND_GIFT.MANUAL && contacts.length > 0 ? (
          <IPayView style={styles.manualList}>
            <IPayView style={styles.listHeader}>
              <IPayView style={styles.iconHeader}>
                <IPayIcon icon={icons.user_filled} />
                <IPayView>
                  <IPayCaption1Text
                    regular
                    text={localizationText.SEND_GIFT.RECIPIENT}
                    color={colors.primary.primary600}
                  />
                  <IPaySubHeadlineText text={givenName} regular color={colors.natural.natural900} />
                </IPayView>
              </IPayView>
              <IPayImage image={images.alinmaP} resizeMode="contain" style={styles.image} />
            </IPayView>
            <IPayView style={styles.amountInput2}>
              <IPayFootnoteText text={localizationText.TOP_UP.ENTER_AMOUNT} />
              <IPayAmountInput
                amount={contactAmounts[recordID] || ''}
                onAmountChange={(number: number) => handleContactAmountChange(number, recordID)}
              />
            </IPayView>
            <IPayButton
              btnType="link-button"
              btnText={localizationText.PROFILE.REMOVE}
              rightIcon={<IPayIcon icon={icons.trash} size={18} color={colors.primary.primary500} />}
              onPress={() => handleRemoveContact(recordID)}
              textColor={colors.primary.primary500}
            />
          </IPayView>
        ) : (
          <IPayList
            isShowIcon
            icon={<IPayIcon icon={icons.trash} color={colors.primary.primary500} />}
            onPressIcon={() => handleRemoveContact(recordID)}
            title={givenName}
            isShowDetail
            detailTextStyle={styles.amountText}
            detailText={detailText}
            isShowLeftIcon
            leftIcon={<IPayIcon icon={icons.user_filled} />}
          />
        )}
      </IPayView>
    );
  };

  const renderAmountInput = () => {
    switch (selectedTab) {
      case localizationText.SEND_GIFT.EQUALLY:
        return (
          <IPayRemainingAccountBalance
            payChannelType={TransactionTypes.SEND_GIFT}
            showProgress={false}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            chipValue={chipValue}
            walletInfo={walletInfo}
            showQuickAmount
          />
        );
      case localizationText.SEND_GIFT.SPLIT:
        return (
          <IPayRemainingAccountBalance
            payChannelType={TransactionTypes.SEND_GIFT}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            chipValue={chipValue}
            walletInfo={walletInfo}
            showProgress={false}
            showQuickAmount
          />
        );
      case localizationText.SEND_GIFT.MANUAL:
        return (
          <IPayView style={styles.manual}>
            <IPayFootnoteText style={styles.text} color={colors.primary.primary800}>
              {localizationText.SEND_GIFT.CUSTOM_AMOUNT1}
              <IPayFootnoteText text={localizationText.SEND_GIFT.CUSTOM_AMOUNT2} regular={false} />
            </IPayFootnoteText>
          </IPayView>
        );
      default:
        return null;
    }
  };
  const getContactInfoText = () => {
    const totalContacts = selectedContacts.length;
    const selectedContactsCount = contacts.length;
    return (
      <IPayView
        style={
          selectedTab === localizationText.SEND_GIFT.MANUAL
            ? styles.manualContactInfoContainer
            : styles.contactInfoContainer
        }
      >
        <IPayFootnoteText
          regular={false}
          text={`${selectedContactsCount} ${localizationText.HOME.OF}`}
          color={colors.natural.natural900}
        />
        <IPayFootnoteText
          regular
          color={colors.natural.natural500}
          text={`${totalContacts} ${localizationText.WALLET_TO_WALLET.CONTACTS}`}
        />
      </IPayView>
    );
  };
  const onSend = () => {
    navigate(ScreenNames.TRANSFER_SUMMARY, { transactionType: TransactionTypes.SEND_GIFT });
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader title={localizationText.SEND_GIFT.TITLE} applyFlex backBtn />
      <IPayView style={styles.container}>
        <IPayView>
          <IPayTopUpBox
            availableBalance={formatNumberWithCommas(currentBalance)}
            isShowTopup
            isShowRemaining
            isShowProgressBar
            currentBalance={formatNumberWithCommas(currentBalance)}
            monthlyRemainingOutgoingBalance={formatNumberWithCommas(currentBalance)}
          />
        </IPayView>
        <IPayView
          style={selectedTab === localizationText.SEND_GIFT.MANUAL ? styles.manualComponent : styles.amountComponent}
        >
          <IPayView style={styles.header}>
            <IPayFootnoteText text={localizationText.SEND_GIFT.SELECT_METHOD} color={colors.primary.primary600} />
            <IPaySegmentedControls tabs={GIFT_TABS} onSelect={handleSelectedTab} selectedTab={selectedTab} />
          </IPayView>
          {renderAmountInput()}
        </IPayView>
        <IPayView
          style={selectedTab === localizationText.SEND_GIFT.MANUAL ? styles.manualContactList : styles.contactList}
        >
          {getContactInfoText()}
          <IPayFlatlist
            scrollEnabled
            data={contacts}
            extraData={contacts}
            renderItem={renderItem}
            keyExtractor={(item) => item.recordID}
            showsVerticalScrollIndicator={false}
          />
        </IPayView>
      </IPayView>
      <IPayView style={styles.buttonContainer}>
        <IPayButton
          btnType="primary"
          large
          btnText={localizationText.SEND_GIFT.SEND}
          btnIconsDisabled
          onPress={onSend}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default SendGiftAmountScreen;
