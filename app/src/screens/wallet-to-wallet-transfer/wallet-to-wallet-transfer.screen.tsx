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
  IPayContactsPermission,
  IPayHeader,
  IPayLimitExceedBottomSheet,
  IPayNoResult,
  IPayRHFAnimatedTextInput,
  IPayTextInput,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPaySafeAreaView } from '@app/components/templates';
import constants, { MAX_CONTACTS, SNAP_POINT } from '@app/constants/constants';
import TRANSFERTYPE from '@app/enums/wallet-transfer.enum';
import { useKeyboardStatus } from '@app/hooks';
import useContacts from '@app/hooks/use-contacts';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { IW2WCheckActiveReq } from '@app/network/services/transfers/wallet-to-wallet-check-active/wallet-to-wallet-check-active.interface';
import walletToWalletCheckActive from '@app/network/services/transfers/wallet-to-wallet-check-active/wallet-to-wallet-check-active.service';
import { getDeviceInfo } from '@app/network/utilities';
import { DeviceInfoProps } from '@app/network/utilities/utilities.interface';
import { getValidationSchemas } from '@app/services';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isIosOS } from '@app/utilities/constants';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Contact } from 'react-native-contacts';
import * as Yup from 'yup';
import AddPhoneFormValues from './wallet-to-wallet-transfer.interface';
import walletTransferStyles from './wallet-to-wallet-transfer.style';

const WalletToWalletTransferScreen: React.FC = ({ route }: any) => {
  const {
    heading,
    from = TRANSFERTYPE.SEND_MONEY,
    showHistory = true,
    giftDetails,
    qrErrorMessage = '',
  } = route?.params || {};
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const { isKeyboardOpen } = useKeyboardStatus();
  const remainingLimitRef = useRef<any>();
  const [unSavedVisible, setUnSavedVisible] = useState(false);
  const [search, setSearch] = useState<string>('');
  const { onPermissionGranted, contacts } = useContacts();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const flatListRef = useRef<any>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const SCROLL_SIZE = 100;
  const ICON_SIZE = 18;
  const styles = walletTransferStyles(colors, selectedContacts?.length > 0);

  const getW2WActiveFriends = async () => {
    const payload: IW2WCheckActiveReq = {
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      mobileNumbers: selectedContacts.map((item) => item?.phoneNumbers[0]?.number),
    };
    const apiResponse = await walletToWalletCheckActive(walletInfo.walletNumber as string, payload);
    if (apiResponse.status.type === 'SUCCESS') {
      if (apiResponse.response?.friends) {
        switch (from) {
          case TRANSFERTYPE.SEND_MONEY:
            navigate(ScreenNames.SEND_MONEY_FORM, {
              activeFriends: apiResponse.response?.friends,
              selectedContacts,
              setSelectedContacts,
              heading: t('HOME.SEND_MONEY'),
              showReason: true,
            });
            break;
          case TRANSFERTYPE.REQUEST_MONEY:
            navigate(ScreenNames.SEND_MONEY_REQUEST, {
              activeFriends: apiResponse.response?.friends,
              selectedContacts,
              setSelectedContacts,
              heading: t('REQUEST_MONEY.CREATE_REQUEST'),
              from: TRANSFERTYPE.REQUEST_MONEY,
              showHistory: false,
            });
            break;
          case TRANSFERTYPE.SEND_GIFT:
            navigate(ScreenNames.SEND_GIFT_AMOUNT, {
              activeFriends: apiResponse.response?.friends,
              selectedContacts,
              giftDetails,
            });
            break;

          default:
            break;
        }
      }
    }
  };

  const handleSubmitTransfer = () => {
    switch (from) {
      case TRANSFERTYPE.SEND_MONEY:
        getW2WActiveFriends();
        break;
      case TRANSFERTYPE.SEND_GIFT:
        getW2WActiveFriends();
        break;
      case ScreenNames.TOP_UP_SUCCESS:
        setSelectedContacts([]);
        break;
      case ScreenNames.SEND_GIFT_AMOUNT:
        setSelectedContacts([]);
        break;
      case TRANSFERTYPE.REQUEST_MONEY:
        getW2WActiveFriends();
        break;
      default:
        break;
    }
  };

  const searchIcon = <IPayIcon icon={icons.user_filled} size={20} color={colors.primary.primary500} />;

  const renderToast = () => {
    showToast({
      title: 'WALLET_TO_WALLET.CONTACT_LIMIT',
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainer,
    });
  };

  const handleSelect = (contact: Contact, isQR?: boolean) => {
    // Corrected 'lenght' to 'length'
    setSelectedContacts((prevSelectedContacts) => {
      const isAlreadySelected = prevSelectedContacts.some(
        (selectedContact) => selectedContact.recordID === contact.recordID,
      );

      if (isAlreadySelected) {
        // Remove the contact if it's already selected
        return isQR
          ? prevSelectedContacts
          : prevSelectedContacts.filter((selectedContact) => selectedContact.recordID !== contact.recordID);
      }

      // Add the contact if the limit is not exceeded
      if (prevSelectedContacts.length >= MAX_CONTACTS) {
        renderToast();
        return prevSelectedContacts;
      }

      return [...prevSelectedContacts, contact];
    });
  };

  const showUnsavedBottomSheet = () => {
    setUnSavedVisible(true);
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
        {item?.givenName && <IPayFootnoteText color={colors.natural.natural900} text={item?.givenName} />}
        {item?.phoneNumbers[0]?.number && (
          <IPayCaption1Text color={colors.natural.natural500} text={item?.phoneNumbers[0]?.number} regular />
        )}
      </IPayView>
    </IPayPressable>
  );

  const renderSelectedItem = ({ item }: { item: Contact }) => (
    <IPayChip
      textValue={item?.givenName || item?.phoneNumbers[0]?.number}
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
    if (selectedContacts.length === 5) {
      requestAnimationFrame(() => {
        setUnSavedVisible(false);
      });
      Keyboard.dismiss();
      renderToast();
    } else {
      handleSelect({
        givenName: mobileNumber,
        recordID: mobileNumber,
        phoneNumbers: [
          {
            label: t('WALLET_TO_WALLET.UNSAVED_NUMBER'),
            number: mobileNumber,
          },
        ],
      } as Contact);
      Keyboard.dismiss();
      requestAnimationFrame(() => {
        setUnSavedVisible(false);
      });
    }
  };
  const history = () => {
    navigate(ScreenNames.TRANSACTIONS_HISTORY, {
      isW2WTransactions: true,
      isShowTabs: true,
      isShowCard: false,
      contacts,
    });
  };

  const getSearchedContacts = () =>
    contacts.filter(
      (item: any) =>
        item?.phoneNumbers[0]?.number?.includes(search) ||
        item?.givenName.toUpperCase()?.includes(search.toUpperCase()),
    );

  const qrCodeCallBack = (mobileNumber: string) => {
    if (mobileNumber) {
      handleSelect(
        {
          givenName: mobileNumber,
          recordID: mobileNumber,
          phoneNumbers: [
            {
              label: t('WALLET_TO_WALLET.UNSAVED_NUMBER'),
              number: mobileNumber,
            },
          ],
        } as Contact,
        true,
      );
    }
  };
  const { unsavedMobileNumberSchema } = getValidationSchemas(t);

  const validationSchema = Yup.object().shape({
    mobileNumber: unsavedMobileNumberSchema,
  });

  const onCloseSaveContact = () => {
    setUnSavedVisible(false);
  };

  const renderFooterItem = () => <IPayView style={styles.emptyItemStyle} />;

  const onClearSearchBox = () => {
    setSearch('');
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        backBtn
        title={heading || 'HOME.SEND_MONEY'}
        isRight
        rightComponent={
          showHistory && (
            <IPayPressable style={styles.history} onPress={history}>
              <IPayIcon icon={icons.clock_1} size={18} color={colors.primary.primary500} />
              <IPaySubHeadlineText text="WALLET_TO_WALLET.HISTORY" regular color={colors.primary.primary500} />
            </IPayPressable>
          )
        }
        applyFlex
      />
      <IPayView style={styles.contactContainer}>
        <IPayTextInput
          text={search}
          placeholderTextColor={colors.natural.natural500}
          onChangeText={setSearch}
          label="COMMON.SEARCH"
          placeholder="COMMON.SEARCH"
          rightIcon={searchIcon}
          onPressCancle={onClearSearchBox}
          simpleInput
          containerStyle={search ? styles.searchInputStyle : styles.searchInputStyle2}
          showCancleButton={!!search}
          style={[styles.inputStyle, isIosOS && styles.topMargin, styles.textInputContainerStyle]}
        />
        <IPayView style={styles.unsavedAndQr}>
          <IPayPressable style={styles.unsaved} onPress={showUnsavedBottomSheet}>
            <IPayIcon icon={icons.mobile} size={18} />
            <IPaySubHeadlineText
              text="WALLET_TO_WALLET.SEND_TO_UNSAVED_NUMBER"
              regular
              color={colors.primary.primary500}
            />
          </IPayPressable>
          <IPayView style={styles.qr} />
          <IPayPressable
            onPress={() =>
              navigate(ScreenNames.SEND_MONEY_QRCODE_SCANNER, {
                onGoBack: qrCodeCallBack,
                qrErrorMessage,
              })
            }
          >
            <IPayIcon icon={icons.scan_barcode} size={24} />
          </IPayPressable>
        </IPayView>
        {getSearchedContacts().length === 0 && <IPayNoResult message="COMMON.NO_RESULTS_FOUND" />}
        <IPayFlatlist
          data={getSearchedContacts()}
          extraData={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.recordID}
          showsVerticalScrollIndicator={false}
          style={styles.contactList}
          ListFooterComponent={renderFooterItem}
        />
      </IPayView>

      {!isKeyboardOpen ? (
        <IPayLinearGradientView style={styles.submitContact}>
          <IPayView>
            {!!selectedContacts?.length && (
              <>
                <IPayView style={styles.contactCount}>
                  <IPayFootnoteText text={`${selectedContacts?.length} ${t('HOME.OF')}`} regular={false} />
                  <IPayFootnoteText
                    text={`${MAX_CONTACTS} ${t('WALLET_TO_WALLET.CONTACTS')}`}
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
              btnText="COMMON.DONE"
              disabled={!selectedContacts.length}
              onPress={handleSubmitTransfer}
              btnType={buttonVariants.PRIMARY}
            />
          </IPayView>
        </IPayLinearGradientView>
      ) : (
        <IPayView />
      )}

      <IPayPortalBottomSheet
        heading="WALLET_TO_WALLET.UNSAVED_NUMBER"
        enablePanDownToClose
        simpleBar
        isVisible={unSavedVisible}
        // customSnapPoint={isKeyboardWillOpen ? SNAP_POINT.MEDIUM : SNAP_POINT.XX_SMALL}
        customSnapPoint={SNAP_POINT.MEDIUM}
        bold
        cancelBnt
        onCloseBottomSheet={onCloseSaveContact}
      >
        <IPayFormProvider<AddPhoneFormValues> validationSchema={validationSchema} defaultValues={{ mobileNumber: '' }}>
          {({ handleSubmit }) => (
            <IPayView style={styles.unsavedBottomSheet}>
              <IPayRHFAnimatedTextInput
                name="mobileNumber"
                label="WALLET_TO_WALLET.TYPE_MOBILE_NUMBER"
                keyboardType="phone-pad"
                rightIcon={<IPayIcon icon={icons.mobile} size={20} />}
                containerStyle={styles.phoneInputStyle}
                mainContainerStyles={styles.phoneInputStyleMain}
                maxLength={constants.UNSAVED_NUMBER_LENGTH}
                autoFocus
              />
              <IPayButton
                btnStyle={styles.padding}
                btnIconsDisabled
                btnText="COMMON.DONE"
                onPress={handleSubmit(addUnsavedNumber)}
                btnType={buttonVariants.PRIMARY}
              />
            </IPayView>
          )}
        </IPayFormProvider>
      </IPayPortalBottomSheet>
      <IPayLimitExceedBottomSheet ref={remainingLimitRef} handleContinue={() => {}} />
      <IPayContactsPermission onPermissionGranted={onPermissionGranted} />
    </IPaySafeAreaView>
  );
};

export default WalletToWalletTransferScreen;
