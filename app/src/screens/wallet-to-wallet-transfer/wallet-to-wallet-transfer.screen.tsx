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
  IPayRHFAnimatedTextInput,
  IPayTextInput,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import PermissionTypes from '@app/enums/permissions-types.enum';
import TRANSFERTYPE from '@app/enums/wallet-transfer.enum';
import usePermissions from '@app/hooks/permissions.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { isIosOS } from '@app/utilities/constants';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import * as Yup from 'yup';
import { REGEX } from '@app/constants/app-validations';
import { AddPhoneFormValues } from './wallet-to-wallet-transfer.interface';
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
  const flatListRef = useRef<any>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const SCROLL_SIZE = 100;
  const ICON_SIZE = 18;
  const MAX_CONTACT = 5;
  const styles = walletTransferStyles(colors, selectedContacts.length > 0);
  const handleSubmitTransfer = () => {
    switch (from) {
      case TRANSFERTYPE.SEND_MONEY:
        navigate(screenNames.SEND_MONEY_FORM, { selectedContacts });
        break;
      case TRANSFERTYPE.SEND_GIFT:
        navigate(screenNames.SEND_GIFT_AMOUNT, { selectedContacts });
        break;
      default:
        break;
    }

    setSelectedContacts([]);
  };

  useEffect(() => {
    if (permissionStatus === permissionsStatus.GRANTED) {
      Contacts.getAll().then((contactsList: Contact[]) => {
        const flattenedArray = contactsList.reduce((acc, obj) => {
          const mappedValues = obj.phoneNumbers.map((item) => ({
            ...obj,
            phoneNumbers: [
              {
                ...item,
                number: item.number.replace(/ /g, ''),
              },
            ],
          }));
          return acc.concat(mappedValues);
        }, []);

        const saudiNumbers = flattenedArray.filter((item: Contact) => {
          const isSaudiNumber =
            REGEX.SaudiMobileNumber.test(item?.phoneNumbers[0]?.number) ||
            REGEX.LongSaudiMobileNumber.test(item?.phoneNumbers[0]?.number);
          return isSaudiNumber;
        });

        const listWithUniqueId = saudiNumbers.map((item: Contact) => ({
          ...item,
          recordID: `${item?.recordID}#${item?.phoneNumbers[0]?.number}`,
        }));
        setContacts(listWithUniqueId);
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
        return prevSelectedContacts;
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
        {item?.givenName && <IPayFootnoteText text={item?.givenName} />}
        {item?.phoneNumbers[0]?.number && <IPayCaption1Text text={item?.phoneNumbers[0]?.number} regular />}
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

  const addUnsavedNumber = ({ mobileNumber }: AddPhoneFormValues) => {
    handleSelect({
      givenName: mobileNumber,
      recordID: mobileNumber,
      phoneNumbers: [
        {
          label: localizationText.WALLET_TO_WALLET.UNSAVED_NUMBER,
          number: mobileNumber,
        },
      ],
    } as Contact);
    requestAnimationFrame(() => {
      unsavedBottomSheetRef.current?.forceClose();
    });
  };
  const history = () => {
    navigate(screenNames.TRANSACTIONS_HISTORY, {
      isW2WTransactions: true,
      isShowTabs: true,
      isShowCard: false,
      contacts,
    });
  };

  const getSearchedContacts = () =>
    contacts.filter((item) => item?.phoneNumbers[0]?.number?.includes(search) || item?.givenName?.includes(search));

  const qrCodeCallBack = (mobileNumber: string) => {
    if (mobileNumber) {
      handleSelect({
        givenName: mobileNumber,
        recordID: mobileNumber,
        phoneNumbers: [
          {
            label: localizationText.WALLET_TO_WALLET.UNSAVED_NUMBER,
            number: mobileNumber,
          },
        ],
      } as Contact);
    }
  };
  const { mobileNumberSchema } = getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
  });

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
          style={[styles.inputStyle, isIosOS && styles.topMargin]}
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
          <IPayPressable
            onPress={() =>
              navigate(screenNames.SEND_MONEY_QRCODE_SCANNER, {
                onGoBack: qrCodeCallBack,
              })
            }
          >
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
            onPress={handleSubmitTransfer}
            btnType={buttonVariants.PRIMARY}
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
        <IPayFormProvider<AddPhoneFormValues> validationSchema={validationSchema} defaultValues={{ mobileNumber: '' }}>
          {({ handleSubmit }) => (
            <IPayView style={styles.unsavedBottomSheet}>
              <IPayRHFAnimatedTextInput
                name="mobileNumber"
                label={localizationText.WALLET_TO_WALLET.TYPE_MOBILE_NUMBER}
                keyboardType="phone-pad"
                rightIcon={<IPayIcon icon={icons.mobile} size={20} />}
                containerStyle={styles.phoneInputStyle}
                mainContainerStyles={styles.phoneInputStyleMain}
                maxLength={constants.MOBILE_NUMBER_LENGTH}
              />
              <IPayButton
                medium
                btnIconsDisabled
                btnStyle={styles.unsavedButton}
                btnText={localizationText.COMMON.DONE}
                onPress={handleSubmit(addUnsavedNumber)}
                btnType="primary"
              />
            </IPayView>
          )}
        </IPayFormProvider>
      </IPayBottomSheet>
      <IPayLimitExceedBottomSheet ref={remainingLimitRef} handleContinue={() => {}} />
    </IPaySafeAreaView>
  );
};

export default WalletToWalletTransferScreen;
