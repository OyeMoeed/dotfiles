import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayAmountInput, IPayButton, IPayChip, IPayHeader, IPayList, IPayTopUpBox } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPayRemainingAccountBalance } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack, navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import wallet2WalletFeesMock from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.mock';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import { alertType, alertVariant, buttonVariants } from '@app/utilities/enums.util';
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
  const MAX_COUNT = 5;
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [contactToRemove, setContactToRemove] = useState<Contact | null>(null);

  useEffect(() => {
    setContacts(selectedContacts);
  }, [selectedContacts]);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
    if (tab === localizationText.SEND_GIFT.MANUAL) setTopUpAmount('');
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

  // Calculate the total manual amount
  const calculateTotalManualAmount = () => {
    return Object.values(contactAmounts)
      .reduce((total, amount) => total + (amount ? parseFloat(amount) : 0), 0)
      .toFixed(2);
  };

  // Handle removing the contact from recipient
  const handleRemoveContact = (contactId: string) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter((contact) => contact.recordID !== contactId);

      // If no contacts are left, navigate back
      if (updatedContacts.length === 0) {
        goBack();
      }

      return updatedContacts;
    });
  };

  const renderItem = ({ item }: { item: Contact }) => {
    const { givenName, recordID, isAlinma } = item;

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
            {isAlinma && (
              <IPayView style={styles.chipContainer}>
                <IPayChip
                  containerStyle={styles.chipColors}
                  icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
                  textValue={localizationText.TRANSFER_SUMMARY.CHIP_TITLE}
                  headingStyles={styles.chipColors}
                />
              </IPayView>
            )}

            <IPayView style={styles.amountInput2}>
              <IPayFootnoteText style={styles.text2} text={localizationText.TOP_UP.ENTER_AMOUNT} />
              <IPayAmountInput
                style={styles.input}
                inputStyles={styles.manualInput}
                currencyStyle={styles.currencyManual}
                amount={contactAmounts[recordID] || ''}
                onAmountChange={(number: number) => handleContactAmountChange(number, recordID)}
              />
            </IPayView>
            <IPayButton
              btnType="link-button"
              btnStyle={styles.remove}
              btnText={localizationText.PROFILE.REMOVE}
              rightIcon={<IPayIcon icon={icons.trash} size={18} color={colors.primary.primary500} />}
              onPress={() => handleRemoveContact(recordID)}
              textColor={colors.primary.primary500}
            />
          </IPayView>
        ) : (
          <IPayView style={styles.nonAlinmaList}>
            {isAlinma && (
              <IPayView style={styles.chipContainer2}>
                <IPayChip
                  containerStyle={styles.chipColors}
                  icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
                  textValue={localizationText.TRANSFER_SUMMARY.CHIP_TITLE}
                  headingStyles={styles.chipColors}
                />
              </IPayView>
            )}

            <IPayList
              isShowIcon
              icon={<IPayIcon icon={icons.trash} color={colors.primary.primary500} />}
              onPressIcon={() => showRemoveAlert(item)}
              title={givenName}
              isShowDetail
              detailTextStyle={styles.amountText}
              detailText={detailText}
              isShowLeftIcon
              leftIcon={<IPayIcon icon={icons.user_filled} />}
            />
          </IPayView>
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
    navigate(ScreenNames.GIFT_TRANSFER_SUMMARY, {
      variant: TransactionTypes.SEND_GIFT,
      data: {
        transfersDetails: wallet2WalletFeesMock.response?.requests,
      },
    });
  };

  const removeContactAndHideAlert = (contactId: string) => {
    handleRemoveContact(contactId);
    setAlertVisible(false);
  };
  const IPayAlertComponent = () =>
    alertVisible &&
    contactToRemove && (
      <IPayAlert
        testID="removeContactAlert"
        title={localizationText.SEND_GIFT.REMOVE_CONTACT}
        message={localizationText.SEND_GIFT.REMOVE_CONFIRM}
        icon={<IPayIcon icon={icons.TRASH} size={64} />}
        visible={alertVisible}
        variant={alertVariant.DESTRUCTIVE}
        closeOnTouchOutside
        animationType="fade"
        showIcon={false}
        onClose={() => setAlertVisible(false)}
        primaryAction={{
          text: localizationText.COMMON.CANCEL,
          onPress: () => setAlertVisible(false),
        }}
        secondaryAction={{
          text: localizationText.PROFILE.REMOVE,
          onPress: () => removeContactAndHideAlert(contactToRemove.recordID),
        }}
        type={alertType.SIDE_BY_SIDE}
      />
    );

  const showRemoveAlert = (contact: Contact) => {
    setContactToRemove(contact);
    setAlertVisible(true);
  };

  // Calculate the amount to be shown above the button
  const amountToShow = selectedTab === localizationText.SEND_GIFT.MANUAL ? calculateTotalManualAmount() : topUpAmount;
  const isDisabled = parseFloat(amountToShow) <= 0 || isNaN(parseFloat(amountToShow));
  return (
    <IPaySafeAreaView>
      <IPayHeader title={localizationText.SEND_GIFT.TITLE} applyFlex backBtn />
      <IPayScrollView>
        <IPayView style={styles.container}>
          <IPayView>
            <IPayTopUpBox
              availableBalance={formatNumberWithCommas(currentBalance)}
              isShowTopup
              isShowRemaining
              isShowProgressBar
              monthlyIncomingLimit={walletInfo.limitsDetails.monthlyIncomingLimit}
              monthlyRemainingIncommingAmount={walletInfo.limitsDetails.monthlyRemainingIncomingAmount}
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
      </IPayScrollView>
      <IPayView style={styles.buttonContainer}>
        {selectedTab === localizationText.SEND_GIFT.MANUAL && (
          <IPayList
            title={localizationText.TRANSACTION_HISTORY.TOTAL_AMOUNT}
            showDetail
            detailTextStyle={styles.listTextStyle}
            detailText={`${amountToShow} ${localizationText.COMMON.SAR}`}
          />
        )}
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          large
          btnText={localizationText.SEND_GIFT.SEND}
          btnIconsDisabled
          onPress={onSend}
          disabled={isDisabled}
        />
      </IPayView>
      {IPayAlertComponent()}
    </IPaySafeAreaView>
  );
};

export default SendGiftAmountScreen;
