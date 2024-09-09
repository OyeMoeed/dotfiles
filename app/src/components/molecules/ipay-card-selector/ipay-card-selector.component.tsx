import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';

import { buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import useLocalization from '@app/localization/hooks/localization.hook';
import { WalletNumberProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { getTopupCards } from '@app/network/services/core/topup-cards/topup-cards.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback, useEffect, useState } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import { useToastContext } from '../ipay-toast/context/ipay-toast-context';
import IPayCardSelectorProps from './ipay-card-selector.interface';
import IPayCardSelectorStyles from './ipay-card-selector.styles';
import IPayCardItemProps from './ipay-card.interface';

const IPayCardSelector: React.FC<IPayCardSelectorProps> = ({
  testID,
  onPressAddCard,
  openPressExpired,
  onCardSelect,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = IPayCardSelectorStyles(colors);
  const [selectedCard, setSelectedCard] = useState<number | null>(1);
  const [, setSelectedCardObj] = useState<any>({});
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [apiError, setAPIError] = useState<string>('');
  const [topupCards, setTopupcards] = useState<any[]>([]);
  const { showToast } = useToastContext();

  const handleCardSelect = (key: number) => {
    setSelectedCard(key);
  };

  const handleCardSelectObj = (item: any) => {
    setSelectedCardObj(item);
  };

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
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
    cards.map((card: any, index: number) => ({
      key: index,
      cardType: card?.cardBrand,
      text: `${localizationText.TOP_UP.CARD} ${card?.cardBrand}`,
      cardNumber: `${card?.lastDigits} ****`,
      subtitle: `${card?.lastDigits} ****`,
      expired: isExpired(card),
      ...card,
    }));
  useEffect(() => {
    if (topupCards.length === 1) setSelectedCard(topupCards[0].key);
  }, [topupCards]);

  const getTopupCardsData = async () => {
    renderSpinner(true);

    const payload: WalletNumberProp = {
      walletNumber,
    };

    const apiResponse: any = await getTopupCards(payload);

    if (apiResponse) {
      await setTopupcards(mapTopupcards(apiResponse?.response?.cardList));
    }

    renderSpinner(false);
  };

  useEffect(() => {
    getTopupCardsData();
  }, []);

  const renderItem = ({ item }: { item: IPayCardItemProps }) => (
    <IPayView style={styles.itemContainer}>
      <IPayPressable
        onPress={() => {
          onCardSelect(item);
          if (item.expired) {
            openPressExpired();
          } else {
            handleCardSelect(item.key);
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
        {selectedCard === item.key ? (
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
        {topupCards.length > 0 && (
          <IPayFootnoteText text={localizationText.TOP_UP.CHOOSE_CARD} style={styles.headerText} />
        )}

        <IPayButton
          btnType={buttonVariants.OUTLINED}
          leftIcon={<IPayIcon icon={icons.add_bold} size={20} color={colors.primary.primary850} />}
          btnText={localizationText.TOP_UP.ADD_CARD}
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
