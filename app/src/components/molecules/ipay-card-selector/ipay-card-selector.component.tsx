import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import { CARDS_MOCK_DATA } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback, useEffect, useState } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayCardSelectorProps from './ipay-card-selector.interface';
import IPayCardSelectorStyles from './ipay-card-selector.styles';
import IPayCardItemProps from './ipay-card.interface';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { ApiResponseStatusType, spinnerVariant } from '@app/utilities/enums.util';
import { WalletNumberProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { getTopupCards } from '@app/network/services/core/topup-cards/topup-cards.service';
import { useTypedSelector } from '@app/store/store';
import { useToastContext } from '../ipay-toast/context/ipay-toast-context';

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
  const [selectedCardObj, setSelectedCardObj] = useState<any>({});
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [apiError, setAPIError] = useState<string>('');
  const [topupCards, setTopupcards] = useState<any[]>([]);
  const { showToast } = useToastContext();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

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
    const month = todayDate?.getMonth() + 1;
    const year = todayDate?.getFullYear();

    if (month > parseInt(card?.expirationMonth) && year >= parseInt(card?.expirationYear)) {
      return true;
    } else {
      return false;
    }
  };

  const mapTopupcards = (cards: any) => {
    return cards.map((card: any, index: number) => {
      return {
        key: index,
        cardType: card?.cardBrand,
        text: `${localizationText.TOP_UP.CARD} ${card?.cardBrand}`,
        cardNumber: `${card?.lastDigits} ****`,
        subtitle: `${card?.lastDigits} ****`,
        expired: isExpired(card),
        ...card,
      };
    });
  };
  useEffect(() => {
    if (topupCards.length == 1) setSelectedCard(topupCards[0].key);
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
        style={[styles.cardContainer]}
      >
        <IPayView style={styles.itemContent}>
          <IPayIcon icon={item.cardType} size={24} color={colors.primary.primary900} />
          <IPayView style={styles.textContainer}>
            <IPayFootnoteText text={item.text} style={styles.itemText} />
            <IPayCaption1Text text={item.subtitle} style={styles.subtitleText} />
          </IPayView>
        </IPayView>
        {selectedCard === item.key && (
          <IPayIcon icon={icons.tick_mark_default} size={18} color={colors.primary.primary500} />
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
          btnType="outline"
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
