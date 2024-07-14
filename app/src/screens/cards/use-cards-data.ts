import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import useLocalization from '@app/localization/hooks/localization.hook';
import { CardCategories } from '@app/utilities/enums.util';

const useCardsData = () => {
  const localizationText = useLocalization();
  const CARD_DATA: CardInterface[] = [
    {
      name: 'Adam Ahmad',
      cardNumber: '*** **** **** 1111',
      cardType: CardCategories.CLASSIC,
      cardHeaderText: localizationText.CARDS.CLASSIC_DEBIT_CARD,
      expired: true,
      frozen: false,
      suspended: true,
    },
    {
      name: 'Ali Hassan',
      cardNumber: '*** **** **** 2222',
      cardType: CardCategories.PLATINUM,
      cardHeaderText: localizationText.CARDS.PLATINUM_CASHBACK_PREPAID_CARD,
      expired: false,
      frozen: true,
      suspended: true,
    },
    {
      name: 'Noman Javed',
      cardNumber: '*** **** **** 3333',
      cardType: CardCategories.SIGNATURE,
      cardHeaderText: localizationText.CARDS.SIGNATURE_PREPAID_CARD,
      expired: false,
      frozen: false,
      suspended: false,
    },
  ];
  return { CARD_DATA };
};

export default useCardsData;
