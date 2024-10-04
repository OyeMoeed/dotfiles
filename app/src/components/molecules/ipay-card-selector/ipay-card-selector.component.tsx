import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';

import { WalletNumberProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { getTopupCards } from '@app/network/services/core/topup-cards/topup-cards.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { retrieveData } from '@app/utilities/keychain.utils';
import { EncryptedKey, EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayCardSelectorProps from './ipay-card-selector.interface';
import IPayCardSelectorStyles from './ipay-card-selector.styles';
import IPayCardItemProps from './ipay-card.interface';

const IPayCardSelector: React.FC<IPayCardSelectorProps> = ({
  testID,
  onPressAddCard,
  openPressExpired,
  onCardSelect,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = IPayCardSelectorStyles(colors);
  const [selectedCard, setSelectedCard] = useState<number | string | null>();
  const [, setSelectedCardObj] = useState<any>({});
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);
  const [topupCards, setTopupcards] = useState<any[]>([]);

  const handleCardSelect = (key: number) => {
    setSelectedCard(key);
  };

  const handleCardSelectObj = (item: any) => {
    setSelectedCardObj(item);
  };

  const isExpired = (card: any) => {
    const todayDate = new Date();
    const month = todayDate.getMonth() + 1;
    const year = todayDate?.getFullYear();

    if (month > parseInt(card?.expirationMonth, 10) && year >= parseInt(card?.expirationYear, 10)) {
      return true;
    }
    return false;
  };

  const mapTopupcards = (cards: any) =>
    cards?.map((card: any, index: number) => ({
      key: index,
      cardType: card?.cardBrand,
      text: `${t('TOP_UP.CARD')} ${card?.cardBrand}`,
      cardNumber: `${card?.lastDigits} ****`,
      subtitle: `${card?.lastDigits} ****`,
      expired: isExpired(card),
      ...card,
    }));

  const getDefaultSelectedCard = async () => {
    const retrievedDefaultCard = await retrieveData(EncryptedService.CARDS, EncryptedKey.DEFAULT_CARD);
    const isDefaultCardExist =
      retrievedDefaultCard && !!topupCards?.filter((item) => item.registrationId === retrievedDefaultCard)?.[0];

    if (isDefaultCardExist) {
      setSelectedCard(retrievedDefaultCard);
      const selectedCardIndex = topupCards.findIndex((item) => item.registrationId === retrievedDefaultCard);
      onCardSelect?.(topupCards[selectedCardIndex]);
    } else {
      setSelectedCard(topupCards[0]?.registrationId);
      onCardSelect?.(topupCards[0]);
    }
  };

  useEffect(() => {
    if (topupCards?.length > 0) {
      getDefaultSelectedCard();
    }
  }, [topupCards]);

  const getTopupCardsData = async () => {
    const payload: WalletNumberProp = {
      walletNumber,
    };

    const apiResponse: any = await getTopupCards(payload);

    if (apiResponse) {
      await setTopupcards(mapTopupcards(apiResponse?.response?.cardList));
    }
  };

  useEffect(() => {
    getTopupCardsData();
  }, []);

  const renderItem = ({ item }: { item: IPayCardItemProps }) => (
    <IPayView style={styles.itemContainer}>
      <IPayPressable
        onPress={() => {
          onCardSelect?.(item);
          if (item.expired) {
            openPressExpired?.();
          } else {
            handleCardSelect(item?.registrationId);
            handleCardSelectObj(item);
          }
        }}
        style={styles.cardContainer}
      >
        <IPayView style={styles.itemContent}>
          <IPayIcon icon={item.cardType} size={24} color={colors.primary.primary900} />
          <IPayView style={styles.textContainer}>
            <IPayFootnoteText text={item.text} style={styles.itemText} />
            <IPayCaption1Text text={item.subtitle} style={styles.subtitleText} />
          </IPayView>
        </IPayView>
        {selectedCard === item.registrationId ? (
          <IPayIcon icon={icons.tick_mark_default} size={18} color={colors.primary.primary500} />
        ) : (
          <IPayView />
        )}
      </IPayPressable>
    </IPayView>
  );

  return (
    <IPayView testID={`${testID}-card-selector`} style={styles.containerStyle}>
      <IPayView style={styles.header}>
        {topupCards?.length > 0 && <IPayFootnoteText text="TOP_UP.CHOOSE_CARD" style={styles.headerText} />}

        <IPayButton
          btnType={buttonVariants.OUTLINED}
          leftIcon={<IPayIcon icon={icons.add_bold} size={20} color={colors.primary.primary850} />}
          btnText="MENU.ADD_CARD"
          onPress={onPressAddCard}
        />
      </IPayView>

      <IPayFlatlist
        scrollEnabled
        data={topupCards}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
        style={styles.flatlist}
      />
    </IPayView>
  );
};

export default IPayCardSelector;
