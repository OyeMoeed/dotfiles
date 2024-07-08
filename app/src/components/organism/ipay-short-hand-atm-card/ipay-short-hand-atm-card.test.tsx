import { CardTypes } from '@app/utilities/enums.util';
import { render } from '@testing-library/react-native';
import IPayShortHandAtmCard from './ipay-short-hand-atm-card.component';

describe('IPayShortHandAtmCard', () => {
  it('renders correctly with minimal props', () => {
    const cardDataDebit = {
      title: 'Debit Card',
      cardNumber: '1234 5678 9012 3456',
      cardType: CardTypes.DEBIT_CARD,
    };

    const { getByTestId } = render(<IPayShortHandAtmCard cardData={cardDataDebit} />);
    const atmCardComponent = getByTestId('local-source-image-background'); // Adjust testID based on your component structure

    expect(atmCardComponent).toBeDefined();
  });

  it('displays correct card image based on cardType', () => {
    const cardDataDebit = {
      title: 'Debit Card',
      cardNumber: '1234 5678 9012 3456',
      cardType: CardTypes.DEBIT_CARD,
    };

    const { getByTestId } = render(<IPayShortHandAtmCard cardData={cardDataDebit} />);
    const cardImage = getByTestId('local-source-image-background'); // Adjust testID based on your component structure

    expect(cardImage.props.source.uri).toContain('shortHandDeitCard'); // Adjust based on your image URI pattern
  });

  it('renders title and masked card number correctly', () => {
    const cardDataDebit = {
      title: 'Debit Card',
      cardNumber: '1234 5678 9012 3456',
      cardType: CardTypes.DEBIT_CARD,
    };

    const { getByText } = render(<IPayShortHandAtmCard cardData={cardDataDebit} />);

    const titleElement = getByText('Debit Card');
    const maskedCardNumberElement = getByText('**** 3456');

    expect(titleElement).toBeDefined();
    expect(maskedCardNumberElement).toBeDefined();
  });

  it('renders correct card logo based on cardType', () => {
    const cardDataPlatinum = {
      title: 'Platinum Card',
      cardNumber: '9876 5432 1098 7654',
      cardType: CardTypes.PLATINUIM_CARD,
    };

    const { getByText } = render(<IPayShortHandAtmCard cardData={cardDataPlatinum} />);
    const platinumCardLogo = getByText('Cashback Card'); // Adjust based on your component's rendering logic

    expect(platinumCardLogo).toBeDefined();
  });

  it('masks card number correctly', () => {
    const cardDataSignature = {
      title: 'Signature Card',
      cardNumber: '2468 1357 9874 5632',
      cardType: CardTypes.SIGNATURE_CARD,
    };

    const { getByText } = render(<IPayShortHandAtmCard cardData={cardDataSignature} />);
    const maskedCardNumberElement = getByText('**** 5632');

    expect(maskedCardNumberElement).toBeDefined();
  });
});
