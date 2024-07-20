import icons from '@app/assets/icons';
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
import IPayQuickActions from '@app/components/organism/ipay-quick-actions/ipay-quick-actions.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import PermissionTypes from '@app/enums/permissions-types.enum';
import usePermissions from '@app/hooks/permissions.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import { formatNumberWithCommas, removeCommas } from '@app/utilities/number-helper.util';
import { useEffect, useState } from 'react';
import Contacts, { Contact } from 'react-native-contacts';
import images from '@app/assets/images';
import sendGiftStyles from './sent-gift.styles';

const SendGiftScreen = () => {
  const localizationText = useLocalization();
  const [topUpAmount, setTopUpAmount] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { permissionStatus } = usePermissions(PermissionTypes.CONTACTS, true);

  const GIFT_TABS = [
    localizationText.SEND_GIFT.EQUALLY,
    localizationText.SEND_GIFT.SPLIT,
    localizationText.SEND_GIFT.MANUAL,
  ];

  const { colors } = useTheme();
  const styles = sendGiftStyles(colors);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { currentBalance } = walletInfo; // TODO replace with orignal data
  const [selectedTab, setSelectedTab] = useState<string>(GIFT_TABS[0]);

  useEffect(() => {
    if (permissionStatus === permissionsStatus.GRANTED) {
      Contacts.getAll().then((contactsList: Contact[]) => {
        setContacts(contactsList);
      });
    }
  }, [permissionStatus]);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleAmountChange = (text: string) => {
    const newAmount = removeCommas(text);
    const reg = regex.NUMBERS_ONLY; // Matches an empty string or any number of digits
    if (reg.test(newAmount.toString())) {
      setTopUpAmount(newAmount.toString());
    }
  };

  const calculateAmountPerContact = () => {
    if (contacts.length === 0 || topUpAmount === '') {
      return '0';
    }
    const amountPerContact = topUpAmount / contacts.length;
    return amountPerContact.toFixed(0);
  };

  const renderItem = ({ item }: { item: Contact }) => {
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
                  <IPaySubHeadlineText text={item?.givenName} regular color={colors.natural.natural900} />
                </IPayView>
              </IPayView>
              <IPayImage image={images.logoTab} resizeMode="contain" style={styles.image} />
            </IPayView>
            <IPayView style={styles.amountInput2}>
              <IPayFootnoteText text={localizationText.TOP_UP.ENTER_AMOUNT} />
              <IPayAmountInput amount={topUpAmount} onAmountChange={handleAmountChange} />
            </IPayView>
            <IPayButton
              btnType="link-button"
              btnText={localizationText.PROFILE.REMOVE}
              rightIcon={<IPayIcon icon={icons.trash} size={18} color={colors.primary.primary500} />}
              textColor={colors.primary.primary500}
            />
          </IPayView>
        ) : (
          <IPayList
            isShowIcon
            icon={<IPayIcon icon={icons.trash} color={colors.primary.primary500} />}
            title={item?.givenName}
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

  return (
    <IPaySafeAreaView>
      <IPayView>
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
          <IPayView style={styles.amountComponent}>
            <IPayFootnoteText text={localizationText.SEND_GIFT.SELECT_METHOD} color={colors.primary.primary600} />
            <IPaySegmentedControls tabs={GIFT_TABS} onSelect={handleSelectedTab} selectedTab={selectedTab} />
            {selectedTab === localizationText.SEND_GIFT.MANUAL ? (
              <IPayView style={styles.manual}>
                <IPayFootnoteText text={localizationText.SEND_GIFT.CUSTOM_AMOUNT1}>
                  <IPayFootnoteText text={localizationText.SEND_GIFT.CUSTOM_AMOUNT2} regular={false} />
                </IPayFootnoteText>
              </IPayView>
            ) : (
              <IPayView style={styles.amountInput}>
                <IPayFootnoteText text={localizationText.TOP_UP.ENTER_AMOUNT} />
                <IPayAmountInput amount={topUpAmount} onAmountChange={handleAmountChange} />
                <IPayQuickActions setTopUpAmount={setTopUpAmount} />
              </IPayView>
            )}
          </IPayView>
          <IPayView>
            <IPayFlatlist
              data={contacts}
              extraData={contacts}
              renderItem={renderItem}
              keyExtractor={(item) => item.recordID}
              showsVerticalScrollIndicator={false}
              style={styles.contactList}
            />
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayView style={styles.buttonContainer}>
        <IPayButton btnType="primary" medium btnText={localizationText.SEND_GIFT.SEND} btnIconsDisabled />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default SendGiftScreen;
