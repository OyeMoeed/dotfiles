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
import useTheme from '@app/styles/hooks/theme.hook';
import { variants } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import Contacts, { Contact } from 'react-native-contacts';
import walletTransferStyles from './wallet-to-wallet-transfer.style';

const WalletToWalletTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = walletTransferStyles(colors);
  const localizationText = useLocalization();
  const remainingLimitRef = useRef<any>();
  const unsavedBottomSheetRef = useRef<any>();
  const { permissionStatus: _permissionStatus } = usePermissions(permissionTypes.CONTACTS, true, true);
  const [search, setSearch] = useState<string>('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {};

  useEffect(() => {
    if (_permissionStatus === permissionsStatus.GRANTED) {
      Contacts.getAll()
        .then((contacts) => {
          setContacts(contacts);
        })
        .catch((err) => {
          console.log(err, ' error');
        });
    }
  }, [_permissionStatus]);
  const searchIcon = <IPayIcon icon={icons.user_filled} size={20} color={colors.primary.primary500} />;
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const addUnsavedNumber = () => {
    unsavedBottomSheetRef.current?.present();
  };

  const renderItem = ({ item }) => (
    <IPayView style={styles.checkmarkPoints}>
      <IPayCheckbox isCheck={isChecked} onPress={handleCheck} />
      <IPayView>
        <IPayFootnoteText text={item?.givenName} />
        <IPayCaption1Text text={item?.phoneNumbers[0]?.number} regular />
      </IPayView>
    </IPayView>
  );

  const renderSelectedItem = ({ item }) => (
    <IPayChip
      textValue={item?.givenName}
      variant={variants.PRIMARY}
      isShowRightIcon={true}
      isShowIcon={false}
      containerStyle={styles.selectedContactChip}
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
              text={localizationText.walletToWallet.history}
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
              text={localizationText.walletToWallet.send_to_unsaved_number}
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
      {contacts?.length ? (
        <IPayLinearGradientView style={styles.submitContact}>
          <IPayView>
            <IPayFlatlist
              data={contacts}
              extraData={contacts}
              renderItem={renderSelectedItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.selectedContactList}
            />
            <IPayButton
              medium
              btnIconsDisabled
              btnText={localizationText.done}
              onPress={handleSubmit}
              btnType={'primary'}
            />
          </IPayView>
        </IPayLinearGradientView>
      ) : (
        <></>
      )}
      <IPayBottomSheet
        heading={'unsaved number'}
        enablePanDownToClose
        simpleBar
        ref={unsavedBottomSheetRef}
        customSnapPoint={['1%', '35%']}
        bold
        cancelBnt
      >
        <IPayView style={styles.unsavedBottomSheet}>
          <IPayTextInput
            text={search}
            onChangeText={setSearch}
            label={'Type mobile number'}
            keyboardType={'phone-pad'}
            rightIcon={<IPayIcon icon={icons.mobile} size={18} />}
            containerStyle={[styles.searchInputStyle]}
          />
          <IPayButton
            medium
            btnIconsDisabled
            btnText={localizationText.done}
            onPress={handleSubmit}
            btnType={'primary'}
          />
        </IPayView>
      </IPayBottomSheet>
      <IPayLimitExceedBottomSheet ref={remainingLimitRef} handleContinue={() => {}} />
    </IPaySafeAreaView>
  );
};

export default WalletToWalletTransferScreen;
