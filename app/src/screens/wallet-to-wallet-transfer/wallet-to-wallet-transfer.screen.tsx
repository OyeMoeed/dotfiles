import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCheckbox,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import {
  IPayButton,
  IPayChip,
  IPayHeader,
  IPayLimitExceedBottomSheet,
  IPayNoResult,
  IPayTextInput,
} from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import PermissionTypes from '@app/enums/permissions-types.enum';
import TRANSFERTYPE from '@app/enums/wallet-transfer.enum';
import usePermissions from '@app/hooks/permissions.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import walletTransferStyles from './wallet-to-wallet-transfer.style';

const WalletToWalletTransferScreen: React.FC = ({ route }: any) => {
  const { heading, from = TRANSFERTYPE.SEND_MONEY } = route?.params || {};
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const remainingLimitRef = useRef<any>();
  const unsavedBottomSheetRef = useRef<any>();
  const { permissionStatus } = usePermissions(PermissionTypes.CONTACTS, true);
  const [search, setSearch] = useState<string>('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const flatListRef = useRef<any>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const SCROLL_SIZE = 100;
  const ICON_SIZE = 18;
  const MAX_CONTACT = 5;
  const styles = walletTransferStyles(colors, selectedContacts.length > 0);
  const handleSubmit = () => {
    navigate(screenNames.SEND_MONEY_FORM, { selectedContacts });
    setSelectedContacts([]);
  };

  useEffect(() => {
    if (permissionStatus === permissionsStatus.GRANTED) {
      Contacts.getAll().then((contactsList: Contact[]) => {
        setContacts(contactsList);
      });
    }
  }, [permissionStatus]);
  const searchIcon = <IPayIcon icon={icons.user_filled} size={20} color={colors.primary.primary500} />;
  const handleSelect = (contact: Contact) => {
    setSelectedContacts((prevSelectedContacts) => {
      const isAlreadySelected = prevSelectedContacts.some(
        (selectedContact) => selectedContact.recordID === contact.recordID,
      );
      if (isAlreadySelected) {
        return prevSelectedContacts.filter((selectedContact) => selectedContact.recordID !== contact.recordID);
      }
      if (prevSelectedContacts.length >= MAX_CONTACT) {
        return prevSelectedContacts;
      }
      return [...prevSelectedContacts, contact];
    });
  };

  const showUnsavedBottomSheet = () => {
    unsavedBottomSheetRef.current?.present();
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setCurrentOffset(offsetX);
    setShowLeftArrow(offsetX > 0);
    setShowRightArrow(offsetX + containerWidth < contentWidth);
  };

  const scrollLeft = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: Math.max(currentOffset - SCROLL_SIZE, 0),
        animated: true,
      });
    }
  };

  const scrollRight = () => {
    if (flatListRef.current) {
      flatListRef.current?.scrollToOffset({
        offset: currentOffset + SCROLL_SIZE,
        animated: true,
      });
    }
  };

  const handleContentSizeChange = (contentSizeWidth: number) => {
    setContentWidth(contentSizeWidth);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <IPayPressable style={styles.checkmarkPoints} onPress={() => handleSelect(item)}>
      <IPayCheckbox
        isCheck={selectedContacts.some((selectedContact) => selectedContact.recordID === item.recordID)}
        onPress={() => handleSelect(item)}
      />
      <IPayView style={styles.itemInfo}>
        <IPayFootnoteText text={item?.givenName} />
        <IPayCaption1Text text={item?.phoneNumbers[0]?.number} regular />
      </IPayView>
    </IPayPressable>
  );

  const renderSelectedItem = ({ item }: { item: Contact }) => (
    <IPayChip
      textValue={item?.givenName}
      variant={States.PRIMARY}
      isShowIcon
      containerStyle={styles.selectedContactChip}
      icon={
        <IPayPressable onPress={() => handleSelect(item)}>
          <IPayIcon icon={icons.close} size={12} color={colors.primary.primary500} />
        </IPayPressable>
      }
    />
  );

  const addUnsavedNumber = () => {
    handleSelect({
      givenName: phoneNumber,
      recordID: phoneNumber,
      phoneNumbers: [
        {
          label: localizationText.WALLET_TO_WALLET.UNSAVED_NUMBER,
          number: phoneNumber,
        },
      ],
    } as Contact);
    requestAnimationFrame(() => {
      setPhoneNumber('');
      unsavedBottomSheetRef.current?.close();
    });
  };
  const history = () => {
    navigate(screenNames.TRANSACTIONS_HISTORY, {
      isShowTabs: true,
      isShowCard: false,
    });
  };

  const getSearchedContacts = () =>
    contacts.filter((item) => item?.phoneNumbers[0]?.number?.includes(search) || item?.givenName?.includes(search));

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        backBtn
        title={heading || localizationText.HOME.SEND_MONEY}
        isRight
        rightComponent={
          <IPayPressable style={styles.history} onPress={history}>
            <IPayIcon icon={icons.clock_1} size={18} color={colors.primary.primary500} />
            <IPaySubHeadlineText
              text={localizationText.WALLET_TO_WALLET.HISTORY}
              regular
              color={colors.primary.primary500}
            />
          </IPayPressable>
        }
        applyFlex
      />
      <IPayView style={styles.contactContainer}>
        <IPayTextInput
          text={search}
          placeholderTextColor={colors.natural.natural500}
          onChangeText={setSearch}
          label={localizationText.COMMON.SEARCH}
          placeholder={localizationText.COMMON.SEARCH}
          rightIcon={searchIcon}
          simpleInput
          containerStyle={styles.searchInputStyle}
        />
        <IPayView style={styles.unsavedAndQr}>
          <IPayPressable style={styles.unsaved} onPress={showUnsavedBottomSheet}>
            <IPayIcon icon={icons.mobile} size={18} />
            <IPaySubHeadlineText
              text={localizationText.WALLET_TO_WALLET.SEND_TO_UNSAVED_NUMBER}
              regular
              color={colors.primary.primary500}
            />
          </IPayPressable>
          <IPayView style={styles.qr} />
          <IPayPressable onPress={() => navigate(screenNames.SEND_MONEY_QRCODE_SCANNER)}>
            <IPayIcon icon={icons.scan_barcode} size={24} />
          </IPayPressable>
        </IPayView>

        {getSearchedContacts().length === 0 && <IPayNoResult />}
        <IPayFlatlist
          data={getSearchedContacts()}
          extraData={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.recordID}
          showsVerticalScrollIndicator={false}
          style={styles.contactList}
        />
      </IPayView>

      <IPayLinearGradientView style={styles.submitContact}>
        <IPayView>
          {!!selectedContacts?.length && (
            <>
              <IPayView style={styles.contactCount}>
                <IPayFootnoteText text={`${selectedContacts?.length} ${localizationText.HOME.OF}`} regular={false} />
                <IPayFootnoteText
                  text={`${MAX_CONTACT} ${localizationText.WALLET_TO_WALLET.CONTACTS}`}
                  color={colors.natural.natural500}
                />
              </IPayView>
              <IPayView style={styles.contactChip} onLayout={handleLayout}>
                {showLeftArrow && (
                  <IPayPressable onPress={scrollLeft} style={styles.arrow}>
                    <IPayIcon icon={icons.ARROW_LEFT_DEFAULT} size={ICON_SIZE} color={colors.natural.natural1000} />
                  </IPayPressable>
                )}
                <IPayFlatlist
                  ref={flatListRef}
                  data={selectedContacts}
                  extraData={selectedContacts}
                  renderItem={renderSelectedItem}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.selectedContactList}
                  onScroll={handleScroll}
                  keyExtractor={(item) => item.recordID}
                  onContentSizeChange={handleContentSizeChange}
                  scrollEventThrottle={16}
                />
                {showRightArrow && (
                  <IPayPressable onPress={scrollRight} style={styles.arrow}>
                    <IPayIcon icon={icons.ARROW_RIGHT_DEFAULT} size={ICON_SIZE} color={colors.natural.natural1000} />
                  </IPayPressable>
                )}
              </IPayView>
            </>
          )}

          <IPayButton
            medium
            btnIconsDisabled
            btnText={localizationText.COMMON.DONE}
            disabled={!selectedContacts.length}
            onPress={handleSubmit}
            btnType="primary"
          />
        </IPayView>
      </IPayLinearGradientView>

      <IPayBottomSheet
        heading={localizationText.WALLET_TO_WALLET.UNSAVED_NUMBER}
        enablePanDownToClose
        simpleBar
        // onCloseBottomSheet={handleCancel}
        ref={unsavedBottomSheetRef}
        customSnapPoint={['1%', '40%']}
        bold
        cancelBnt
      >
        <IPayView style={styles.unsavedBottomSheet}>
          <IPayTextInput
            text={phoneNumber}
            onChangeText={setPhoneNumber}
            label={localizationText.WALLET_TO_WALLET.TYPE_MOBILE_NUMBER}
            keyboardType="phone-pad"
            rightIcon={<IPayIcon icon={icons.mobile} size={20} />}
            containerStyle={styles.phoneInputStyle}
          />
          <IPayButton
            medium
            btnIconsDisabled
            btnStyle={styles.unsavedButton}
            btnText={localizationText.COMMON.DONE}
            onPress={addUnsavedNumber}
            btnType="primary"
          />
        </IPayView>
      </IPayBottomSheet>
      <IPayLimitExceedBottomSheet ref={remainingLimitRef} handleContinue={() => {}} />
    </IPaySafeAreaView>
  );
};

export default WalletToWalletTransferScreen;
