import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { CardCategories } from '@app/utilities/enums.util';

const cardData: CardInterface[] = [
  {
    name: 'Adam Ahmad',
    cardNumber: '*** **** **** 1111',
    cardType: CardCategories.CLASSIC,
    cardHeaderText: 'Classic Debit Card',
  },
  {
    name: 'Ali Hassan',
    cardNumber: '*** **** **** 2222',
    cardType: CardCategories.PLATINUM,
    cardHeaderText: 'Platinum Cashback Prepaid Card',
  },
  {
    name: 'Noman Javed',
    cardNumber: '*** **** **** 3333',
    cardType: CardCategories.SIGNATURE,
    cardHeaderText: 'Signature Prepaid Card',
  },
];

export default cardData;
