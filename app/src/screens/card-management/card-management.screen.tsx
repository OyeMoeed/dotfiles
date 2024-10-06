import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import IPayCardListItem from '@app/components/molecules/ipay-card-list-item/ipay-card-list-item.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayActionSheet, IPayBottomSheet } from '@app/components/organism';
import { useKeyboardStatus } from '@app/hooks';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { TopUpCardItem, WalletNumberProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { deleteSavedCard, getTopupCards } from '@app/network/services/core/topup-cards/topup-cards.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isIosOS } from '@app/utilities/constants';
import { alertType, alertVariant, buttonVariants, PayChannel } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import bottomSheetModal from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';
import React, { useEffect, useRef, useState } from 'react';
import { verticalScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import checkUserAccess from '@app/utilities/check-user-access';
import { retrieveData, storeData } from '@app/utilities/keychain.utils';
import { EncryptedKey, EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import cardManagementStyles from './card-management.style';
import IPayNoCardIndicatorComponenent from './ipay-no-card-indicator.component';

const CardManagementScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const [cards, setCards] = useState<any[]>([]);
  const [defaultCardID, setDefaultCardID] = useState('');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [currentCardID, setCurrentCardID] = useState('1');
  const actionSheetRef = useRef<any>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const editNickNameSheet = useRef<bottomSheetModal>(null);
  const [selectedCardName, setSelectedCardName] = useState('');
  const { isKeyboardOpen } = useKeyboardStatus();
  const styles = cardManagementStyles(colors);
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);

  const getCardImage = (cardType: string): any => {
    if (cardType.toLowerCase() === 'visa') {
      return images.visaIcon;
    }
    if (cardType.toLowerCase() === 'mada') {
      return images.madaIcon;
    }
    if (cardType.toLowerCase() === 'master') {
      return images.masterIcon;
    }
    if (cardType.toLowerCase() === 'mastercard') {
      return images.mastercardIcon;
    }
    return images.madaIcon;
  };

  const getTopupCardsData = async () => {
    const retrievedDefaultCard = await retrieveData(EncryptedService.CARDS, EncryptedKey.DEFAULT_CARD);

    if (retrievedDefaultCard) {
      setDefaultCardID(retrievedDefaultCard);
    }

    const payload: WalletNumberProp = {
      walletNumber,
    };

    const apiResponse = await getTopupCards(payload);

    if (apiResponse.status.type === 'SUCCESS') {
      if (apiResponse?.response?.cardList && apiResponse?.response?.cardList?.length > 0) {
        const mappedData = apiResponse?.response?.cardList?.map((item: TopUpCardItem, index: number) => ({
          id: index,
          headerText: item.cardBrand,
          registrationId: item.registrationId,
          lastFourDigit: item.lastDigits,
          cardIcon: getCardImage(item.cardBrand),
          name: '',
        }));
        setCards(mappedData);
      }
    }
  };

  useEffect(() => {
    getTopupCardsData();
  }, []);

  const renderCardListItem = ({ index, item: { id, headerText, lastFourDigit, cardIcon, name, registrationId } }) => (
    <IPayView>
      {registrationId === defaultCardID && (
        <IPayView style={styles.renderItemContainer}>
          <IPaySubHeadlineText regular color={colors.success.success500} text="CARD_MANAGEMENT.DEFAULT" />
        </IPayView>
      )}
      <IPayCardListItem
        headerText={headerText}
        lastFourDigit={lastFourDigit}
        isDefault={registrationId === defaultCardID}
        cardIcon={cardIcon}
        onPressMore={async () => {
          await setCurrentCardID(id);
          await setSelectedCardIndex(index);
          await setSelectedCardName(name);
          actionSheetRef.current.show();
        }}
      />
    </IPayView>
  );

  const renderToast = (title: string, icon: string) => {
    showToast({
      title,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icon} size={20} color={colors.natural.natural0} />,
      containerStyle: {
        bottom: verticalScale(96),
        backgroundColor: colors.success.success500,
        borderColor: colors.success.success500,
      },
    });
  };

  const onDeleteCard = async () => {
    setShowDeleteAlert(false);
    const registrationId = cards[selectedCardIndex]?.registrationId;

    const apiResponse = await deleteSavedCard(walletNumber, registrationId);
    if (apiResponse) {
      setSelectedCardIndex(0);
      const filteredData = cards.filter((el) => el.id !== currentCardID);
      setCards(filteredData);
      setShowDeleteAlert(false);
      renderToast(t('CARD_OPTIONS.CARD_HAS_BEEN_DELETED'), icons.trash);
    }
  };

  const hideBottomSheet = () => {
    actionSheetRef.current.hide();
  };

  const onPressMenu = async (index: number) => {
    if (index === 0) {
      setDefaultCardID(cards[selectedCardIndex].registrationId);
      await storeData(EncryptedService.CARDS, EncryptedKey.DEFAULT_CARD, cards[selectedCardIndex].registrationId);
      hideBottomSheet();
    } else if (index === 1) {
      setShowDeleteAlert(true);
      hideBottomSheet();
    } else if (index === 2) {
      hideBottomSheet();
    }
    // else if (index === 4) {
    //   hideBottomSheet();
    //   editNickNameSheet.current?.present();
    // }
  };

  const renderDeleteAlert = () => (
    <IPayAlert
      type={alertType.SIDE_BY_SIDE}
      showIcon={false}
      icon={<IPayIcon icon={icons.TRASH} size={64} color="red" />}
      primaryAction={{
        text: t('COMMON.CANCEL'),
        onPress: () => setShowDeleteAlert(false),
      }}
      secondaryAction={{ text: t('COMMON.DELETE'), onPress: onDeleteCard }}
      variant={alertVariant.DESTRUCTIVE}
      title="CARD_MANAGEMENT.DELETE_CARD"
      message={`${cards[selectedCardIndex].name}\n**** **** **** ${cards[selectedCardIndex].lastFourDigit}`}
    />
  );

  const onPressSave = () => {
    editNickNameSheet.current?.close();
    renderToast(t('CARD_MANAGEMENT.THE_CARD_HAS_RENAMED'), icons.tick_square);
  };

  const onAddCard = () => {
    const hasAccess = checkUserAccess();
    if (hasAccess) {
      navigate(ScreenNames.TOP_UP, {
        topupChannel: PayChannel.CARD,
      });
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title="CARD_MANAGEMENT.CARD_MANAGEMENT" backBtn applyFlex />
      {cards?.length === 0 ? (
        <IPayNoCardIndicatorComponenent addCard={onAddCard} />
      ) : (
        <IPayView style={styles.cardListContainer}>
          <IPayFootnoteText regular color={colors.natural.natural500} text="CARD_MANAGEMENT.YOUR_CARDS" />
          <IPayFlatlist
            contentContainerStyle={styles.contentContainerStyle}
            data={cards}
            renderItem={renderCardListItem}
          />
          <IPayButton
            onPress={onAddCard}
            btnStyle={styles.addCardButton}
            btnType={buttonVariants.PRIMARY}
            large
            btnText="MENU.ADD_CARD"
            leftIcon={<IPayIcon icon={icons.add_bold} size={20} color={colors.natural.natural0} />}
          />
        </IPayView>
      )}
      <IPayActionSheet
        bodyStyle={styles.actionSheetStyle}
        ref={actionSheetRef}
        testID="more-action-sheet"
        title={cards[selectedCardIndex]?.name || ''}
        message={`**** **** **** ${cards[selectedCardIndex]?.lastFourDigit}` || ''}
        options={[
          t('CARD_MANAGEMENT.MAKE_IT_DEFAULT'),
          t('CARD_MANAGEMENT.DELETE_CARD'),
          t('COMMON.CANCEL'),
          // t("CARD_MANAGEMENT.EDIT_NICK_NAME"),
        ]}
        cancelButtonIndex={3}
        destructiveButtonIndex={2}
        showIcon
        showCancel
        customImage={
          <IPayView style={styles.sheetCardIcon}>
            <IPayImage
              image={cards[selectedCardIndex]?.cardIcon || ''}
              style={styles.sheetCardIconSize}
              resizeMode="contain"
            />
          </IPayView>
        }
        onPress={onPressMenu}
      />

      <IPayBottomSheet
        heading="CARD_MANAGEMENT.EDIT_NICK_NAME"
        enablePanDownToClose
        simpleBar
        cancelBnt
        noGradient
        customSnapPoint={['1%', isIosOS && isKeyboardOpen ? '75%' : '55%']}
        onCloseBottomSheet={() => {
          editNickNameSheet.current?.close();
        }}
        ref={editNickNameSheet}
      >
        <IPayView style={styles.container}>
          <IPayView style={styles.bottomSheetContainer}>
            <IPayCardListItem
              containerStyle={styles.listItemContainer}
              headerText={cards[selectedCardIndex]?.headerText}
              lastFourDigit={cards[selectedCardIndex]?.lastFourDigit}
              cardIcon={cards[selectedCardIndex]?.cardIcon}
              hideMore
            />
            <IPayView style={styles.inputContainer}>
              <IPayAnimatedTextInput
                label="COMMON.CARD_NAME"
                value={selectedCardName}
                containerStyle={styles.inputStyles}
                editable
                onChangeText={(value) => setSelectedCardName(value)}
                customIcon={
                  <IPayPressable onPress={() => setSelectedCardName('')}>
                    <IPayIcon icon={icons.CLOSE_SQUARE} color={colors.natural.natural500} />
                  </IPayPressable>
                }
                showRightIcon
              />
            </IPayView>
          </IPayView>
          <IPayButton
            onPress={onPressSave}
            btnStyle={styles.saveButtonStyle}
            btnType={buttonVariants.PRIMARY}
            large
            btnIconsDisabled
            btnText="COMMON.SAVE"
            leftIcon={<IPayIcon icon={icons.add_bold} size={20} color={colors.natural.natural0} />}
          />
        </IPayView>
      </IPayBottomSheet>
      {showDeleteAlert && renderDeleteAlert()}
    </IPaySafeAreaView>
  );
};

export default CardManagementScreen;
