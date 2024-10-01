import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { CardListItem } from '@app/network/services/core/transaction/transaction.interface';
import i18n from 'i18next';
import { CardStatusNumber, CardTypes } from './enums.util';

const filterCards = (cards: any) => {
  const availableCards = cards.filter(
    (card: any) =>
      card.cardStatus === CardStatusNumber.ActiveWithOnlinePurchase ||
      card.cardStatus === CardStatusNumber.ActiveWithoutOnlinePurchase ||
      card.cardStatus === CardStatusNumber.Freezed,
  );

  return availableCards;
};

const getCardDesc = (cardType: CardTypes) => {
  switch (cardType) {
    case CardTypes.PLATINUM:
      return i18n.t('CARDS.PLATINUM_CASHBACK_PREPAID_CARD');

    case CardTypes.SIGNATURE:
      return i18n.t('CARDS.SIGNATURE_PREPAID_CARD');

    case CardTypes.CLASSIC:
      return i18n.t('CARDS.CLASSIC_DEBIT_CARD');

    default:
      return '';
  }
};

const mapCardData = (cards: CardListItem[]) => {
  let mappedCards: CardInterface[] = [];
  mappedCards = cards.map((card: any) => ({
    name: card?.linkedName?.embossingName,
    cardType: card?.cardTypeId,
    cardHeaderText: getCardDesc(card?.cardTypeId),
    expired: card?.reissueDue,
    frozen: card.cardStatus === CardStatusNumber.Freezed,
    suspended: false,
    maskedCardNumber: card?.maskedCardNumber,
    cardNumber: card.lastDigits,
    creditCardDetails: {
      availableBalance: '5200.40',
    },
    totalCashbackAmt: card.totalCashbackAmt,
    ...card,
  }));
  return mappedCards;
};

export { mapCardData, getCardDesc, filterCards };
