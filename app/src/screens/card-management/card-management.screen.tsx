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
import { useKeyboardStatus } from '@app/hooks/use-keyboard-status';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { isIosOS } from '@app/utilities/constants';
import { alertType, alertVariant, buttonVariants } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import bottomSheetModal from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';
import React, { useRef, useState } from 'react';
import { verticalScale } from 'react-native-size-matters';
import cardManagementStyles from './card-management.style';
import IPayNoCardIndicatorComponenent from './ipay-no-card-indicator.component';
import checkUserAccess from '@app/utilities/check-user-access';

const DUMMY_CARDS = [
  {
    id: '1',
    headerText: 'Mada Card',
    lastFourDigit: '4400',
    cardIcon: images.madaIcon,
    name: 'Adam Ahmed',
  },
  {
    id: '2',
    headerText: 'Master Card',
    lastFourDigit: '1250',
    cardIcon: images.masterIcon,
    name: 'Adam Ahmed',
  },
];

const CardManagementScreen: React.FC = () => {
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const localizationText = useLocalization();
  const [cards, setCards] = useState(DUMMY_CARDS);
  const [defaultCardID, setDefaultCardID] = useState('1');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [currentCardID, setCurrentCardID] = useState('1');
  const actionSheetRef = useRef<any>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const editNickNameSheet = useRef<bottomSheetModal>(null);
  const [selectedCardName, setSelectedCardName] = useState(cards[selectedCardIndex].name);
  const { isKeyboardOpen } = useKeyboardStatus();

  const styles = cardManagementStyles(colors);

  const renderCardListItem = ({ index, item: { id, headerText, lastFourDigit, cardIcon, name } }) => (
    <IPayView>
      {id === defaultCardID && (
        <IPayView style={styles.renderItemContainer}>
          <IPaySubHeadlineText regular color={colors.success.success500} text={'CARD_MANAGEMENT.DEFAULT'} />
        </IPayView>
      )}
      <IPayCardListItem
        headerText={headerText}
        lastFourDigit={lastFourDigit}
        isDefault={id === defaultCardID}
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

  const onDeleteCard = () => {
    setSelectedCardIndex(0);
    const filteredData = cards.filter((el) => el.id !== currentCardID);
    setCards(filteredData);
    setShowDeleteAlert(false);
    renderToast(localizationText.CARD_OPTIONS.CARD_HAS_BEEN_DELETED, icons.trash);
  };

  const hideBottomSheet = () => {
    actionSheetRef.current.hide();
  };

  const onPressMenu = async (index: number) => {
    if (index === 0) {
      setDefaultCardID(cards[selectedCardIndex].id);
      hideBottomSheet();
    } else if (index === 1) {
      hideBottomSheet();
      editNickNameSheet.current?.present();
    } else if (index === 2) {
      setShowDeleteAlert(true);
      hideBottomSheet();
    } else if (index === 3) {
      hideBottomSheet();
    }
  };

  const renderDeleteAlert = () => (
    <IPayAlert
      type={alertType.SIDE_BY_SIDE}
      showIcon={false}
      icon={<IPayIcon icon={icons.TRASH} size={64} color="red" />}
      primaryAction={{
        text: localizationText.COMMON.CANCEL,
        onPress: () => setShowDeleteAlert(false),
      }}
      secondaryAction={{ text: localizationText.COMMON.DELETE, onPress: onDeleteCard }}
      variant={alertVariant.DESTRUCTIVE}
      title={localizationText.CARD_MANAGEMENT.DELETE_CARD}
      message={`${cards[selectedCardIndex].name}\n**** **** **** ${cards[selectedCardIndex].lastFourDigit}`}
    />
  );

  const onNavigateToAddCard = () => {
    const hasAccess = checkUserAccess();
    if (hasAccess) {
      navigate(ScreenNames.ADD_CARD);
    }
  };

  const onPressSave = () => {
    editNickNameSheet.current?.close();
    renderToast(localizationText.CARD_MANAGEMENT.THE_CARD_HAS_RENAMED, icons.tick_square);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_MANAGEMENT.CARD_MANAGEMENT} backBtn applyFlex />
      {cards.length === 0 ? (
        <IPayNoCardIndicatorComponenent />
      ) : (
        <IPayView style={styles.cardListContainer}>
          <IPayFootnoteText regular color={colors.natural.natural500} text={'CARD_MANAGEMENT.YOUR_CARDS'} />
          <IPayFlatlist
            contentContainerStyle={styles.contentContainerStyle}
            data={cards}
            renderItem={renderCardListItem}
          />
          <IPayButton
            onPress={onNavigateToAddCard}
            btnStyle={styles.addCardButton}
            btnType={buttonVariants.PRIMARY}
            large
            btnText={'MENU.ADD_CARD'}
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
          localizationText.CARD_MANAGEMENT.MAKE_IT_DEFAULT,
          localizationText.CARD_MANAGEMENT.EDIT_NICK_NAME,
          localizationText.CARD_MANAGEMENT.DELETE_CARD,
          localizationText.COMMON.CANCEL,
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
        heading={localizationText.CARD_MANAGEMENT.EDIT_NICK_NAME}
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
              headerText={cards[selectedCardIndex].headerText}
              lastFourDigit={cards[selectedCardIndex].lastFourDigit}
              cardIcon={cards[selectedCardIndex].cardIcon}
              hideMore
            />
            <IPayView style={styles.inputContainer}>
              <IPayAnimatedTextInput
                label={localizationText.COMMON.CARD_NAME}
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
            btnText={'COMMON.SAVE'}
            leftIcon={<IPayIcon icon={icons.add_bold} size={20} color={colors.natural.natural0} />}
          />
        </IPayView>
      </IPayBottomSheet>
      {showDeleteAlert && renderDeleteAlert()}
    </IPaySafeAreaView>
  );
};

export default CardManagementScreen;
