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
import { IPayButton, IPayChip, IPayHeader, IPayLimitExceedBottomSheet, IPayTextInput } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import { permissionTypes } from '@app/enums/permissions-types.enum';
import usePermissions from '@app/hooks/permissions.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { variants } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '../auth/forgot-passcode/otp-verification.component';
import walletTransferStyles from './wallet-to-wallet-transfer.style';

const SCROLL_AMOUNT = 100;

const ICON_SIZE = 18;
const WalletToWalletTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = walletTransferStyles(colors);
  const localizationText = useLocalization();
  const remainingLimitRef = useRef<any>();
  const unsavedBottomSheetRef = useRef<any>();
  const { permissionStatus: _permissionStatus } = usePermissions(permissionTypes.CONTACTS, true, true);
  const [search, setSearch] = useState<string>('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const sendMoneyBottomSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const otpVerificationRef = useRef(null);
  const helpCenterRef = useRef(null);

  const handleSubmit = () => {};

  useEffect(() => {
    if (_permissionStatus === permissionsStatus.GRANTED) {
      Contacts.getAll()
        .then((contacts) => {
          setContacts(contacts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [_permissionStatus]);
  const searchIcon = <IPayIcon icon={icons.user_filled} size={20} color={colors.primary.primary500} />;
  const handleSelect = (contact: Contact) => {
    setSelectedContacts((prevSelectedContacts) => {
      const isAlreadySelected = prevSelectedContacts.some(
        (selectedContact) => selectedContact.recordID === contact.recordID,
      );

      if (isAlreadySelected) {
        return prevSelectedContacts.filter((selectedContact) => selectedContact.recordID !== contact.recordID);
      } else {
        return [...prevSelectedContacts, contact];
      }
    });
  };

  const addUnsavedNumber = () => {
    unsavedBottomSheetRef.current?.present();
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onCloseBottomSheet = () => {
    otpVerificationRef?.current?.resetInterval();
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setCurrentOffset(offsetX);

    if (offsetX <= 0) {
      setShowLeftArrow(false);
    } else {
      setShowLeftArrow(true);
    }
    if (offsetX + containerWidth >= contentWidth) {
      setShowRightArrow(false);
    } else {
      setShowRightArrow(true);
    }
  };

  const scrollLeft = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: Math.max(currentOffset - SCROLL_AMOUNT, 0),
        animated: true,
      });
    }
  };

  const scrollRight = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: currentOffset + SCROLL_AMOUNT,
        animated: true,
      });
    }
  };

  const handleContentSizeChange = (contentWidth) => {
    setContentWidth(contentWidth);
  };

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const renderItem = ({ item }) => (
    <IPayPressable style={styles.checkmarkPoints} onPress={() => handleSelect(item)}>
      <IPayCheckbox isCheck={selectedContacts.some((selectedContact) => selectedContact.recordID === item.recordID)} />
      <IPayView style={styles.itemInfo}>
        <IPayFootnoteText text={item?.givenName} />
        <IPayCaption1Text text={item?.phoneNumbers[0]?.number} regular />
      </IPayView>
    </IPayPressable>
  );

  const renderSelectedItem = ({ item }) => (
    <IPayChip
      textValue={item?.givenName}
      variant={variants.PRIMARY}
      isShowIcon
      containerStyle={styles.selectedContactChip}
      icon={
        <IPayPressable onPress={() => handleSelect(item)}>
          <IPayIcon icon={icons.close} size={12} color={colors.primary.primary500} />
        </IPayPressable>
      }
    />
  );
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        backBtn
        title={localizationText.send_money}
        isRight
        rightComponent={
          <IPayView style={styles.history}>
            <IPayIcon icon={icons.clock_1} size={18} color={colors.primary.primary500} />
            <IPaySubHeadlineText
              text={localizationText.WALLET_TO_WALLET.HISTORY}
              regular
              color={colors.primary.primary500}
            />
          </IPayView>
        }
        applyFlex
      />
      <IPayView style={styles.contactContainer}>
        <IPayTextInput
          text={search}
          placeholderTextColor={colors.natural.natural500}
          onChangeText={setSearch}
          placeholder={localizationText.search}
          rightIcon={searchIcon}
          simpleInput
          containerStyle={[styles.searchInputStyle]}
        />
        <IPayView style={styles.unsavedAndQr}>
          <IPayPressable style={styles.unsaved} onPress={addUnsavedNumber}>
            <IPayIcon icon={icons.mobile} size={18} />
            <IPaySubHeadlineText
              text={localizationText.WALLET_TO_WALLET.SEND_TO_UNSAVED_NUMBER}
              regular
              color={colors.primary.primary500}
            />
          </IPayPressable>
          <IPayView style={styles.qr} />
          <IPayIcon icon={icons.scan_barcode} size={24} />
        </IPayView>
        <IPayFlatlist
          data={contacts}
          extraData={contacts}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.contactList}
        />
      </IPayView>
      <IPayLinearGradientView style={styles.submitContact}>
        <IPayView>
          {selectedContacts?.length ? (
            <>
              <IPayView style={styles.contactCount}>
                <IPayFootnoteText text={`${selectedContacts?.length} ${localizationText.of}`} regular={false} />
                <IPayFootnoteText
                  text={`${contacts?.length} ${localizationText.WALLET_TO_WALLET.CONTACTS}`}
                  color={colors.natural.natural500}
                />
              </IPayView>
              <View style={styles.contactChip} onLayout={handleLayout}>
                {showLeftArrow && (
                  <IPayPressable onPress={scrollLeft} style={styles.arrow}>
                    <IPayIcon icon={icons.ARROW_LEFT_DEFAULT} size={ICON_SIZE} color={colors.natural.natural1000} />
                  </IPayPressable>
                )}
                <FlatList
                  ref={flatListRef}
                  data={selectedContacts}
                  extraData={selectedContacts}
                  renderItem={renderSelectedItem}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.selectedContactList}
                  onScroll={handleScroll}
                  onContentSizeChange={handleContentSizeChange}
                  scrollEventThrottle={16}
                />
                {showRightArrow && (
                  <IPayPressable onPress={scrollRight} style={styles.arrow}>
                    <IPayIcon icon={icons.ARROW_RIGHT_DEFAULT} size={ICON_SIZE} color={colors.natural.natural1000} />
                  </IPayPressable>
                )}
              </View>
            </>
          ) : (
            <></>
          )}

          <IPayButton
            medium
            btnIconsDisabled
            btnText={localizationText.done}
            onPress={handleSubmit}
            btnType={'primary'}
          />
        </IPayView>
      </IPayLinearGradientView>

      <IPayBottomSheet
        heading={localizationText.WALLET_TO_WALLET.UNSAVED_NUMBER}
        enablePanDownToClose
        simpleBar
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
            keyboardType={'phone-pad'}
            rightIcon={<IPayIcon icon={icons.mobile} size={20} />}
            containerStyle={[styles.phoneInputStyle]}
          />
          <IPayButton
            medium
            btnIconsDisabled
            btnStyle={styles.unsavedButton}
            btnText={localizationText.done}
            onPress={handleSubmit}
            btnType={'primary'}
          />
        </IPayView>
      </IPayBottomSheet>
      <IPayLimitExceedBottomSheet ref={remainingLimitRef} handleContinue={() => {}} />
      <IPayBottomSheet
        heading={localizationText.send_money}
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={['1%', '95%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={sendMoneyBottomSheetRef}
      >
        <OtpVerificationComponent
          ref={otpVerificationRef}
          testID={'otp-verification-bottom-sheet'}
          onCallback={() => {
            navigate(screenNames.HOME);
            sendMoneyBottomSheetRef.current?.close();
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
        <HelpCenterComponent testID={'help-center-bottom-sheet'} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default WalletToWalletTransferScreen;
