import { CardCategories } from '@app/utilities/enums.util';
import { render } from '@testing-library/react-native';
import IPayATMCard from './ipay-atm-card.component';

// Mock dependencies
jest.mock('@app/assets/images', () => ({
  logo: 'mock_logo',
  madaIcon: 'mock_mada',
  visaWhite: 'mock_visa',
  textLogoLight: 'mock_textLogoLight',
  classicBg: 'mock_classicBg',
  platinumBg: 'mock_platinumBg',
  signatureBg: 'mock_signatureBg',
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    CARDS: {
      CARD_EXPIRED: 'Card Expired',
      CASHBACK: 'CASHBACK',
    },
  }),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      classicCardGradient: 'mock_classicCardGradient',
      platinumCardGradient: 'mock_platinumCardGradient',
      signatureCardGradient: 'mock_signatureCardGradient',
      primary: { primary900: 'red' },
      natural: { natural0: '#FFFFFF' },
      backgrounds: {
        errorOverlay: '#fae4e599',
      },
    },
  }),
}));

// Mock enum
jest.mock('@app/utilities/enums.util', () => ({
  CardCategories: {
    CLASSIC: 'classic',
    PLATINUM: 'platinum',
    SIGNATURE: 'signature',
  },
  CardTypes: {
    CLASSIC: 'classic',
    PLATINUM: 'platinum',
    SIGNATURE: 'signature',
  },
}));

jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
}));

jest.mock('@components/atoms', () => ({
  IPayLinearGradientView: jest.fn((props) => {
    return <div {...props}>{props.children}</div>;
  }),
  IPayView: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayIcon: jest.fn((props) => <div {...props} />),
  IPayCaption1Text: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayFootnoteText: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayImage: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayText: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

jest.mock('@app/components/molecules', () => ({
  IPayButton: jest.fn(({ btnText, onPress, ...props }) => (
    <button onClick={onPress} {...props}>
      {btnText}
    </button>
  )),
}));

jest.mock('react-native', () => ({
  ImageBackground: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

// Mock IPayATMCardProps
const mockProps = {
  card: {
    cardHeaderText: 'Mock Card Header Text',
    name: 'Mock Name',
    cardNumber: '1234 5678 9101 1121',
    cardType: CardCategories.CLASSIC,
    expired: true,
    frozen: false,
  },
};

describe('IPayATMCard', () => {
  const testID = 'test-id';
  it('renders correctly', () => {
    const { getByTestId } = render(<IPayATMCard testID={testID} {...mockProps} />);

    expect(getByTestId(`${testID}-view`)).toBeTruthy();
    expect(getByTestId(`${testID}-footnote-text`)).toBeTruthy();
  });

  it('renders correctly with default classic card variant', () => {
    const { getByTestId } = render(<IPayATMCard testID={testID} {...mockProps} />);

    expect(getByTestId(`${testID}-bottom-left-image`)).toBeTruthy();
    expect(getByTestId(`${testID}-bottom-right-image`)).toBeTruthy();
  });

  it('renders correct with platinum card variant', () => {
    const { getByTestId } = render(
      <IPayATMCard testID={testID} {...mockProps} card={{ ...mockProps.card, cardType: CardCategories.PLATINUM }} />,
    );
    expect(getByTestId(`${testID}-bottom-left-text`)).toBeTruthy();
    expect(getByTestId(`${testID}-bottom-right-image`)).toBeTruthy();
  });

  it('renders correctly with signature card variant', () => {
    const { getByTestId } = render(
      <IPayATMCard testID={testID} {...mockProps} card={{ ...mockProps.card, cardType: CardCategories.SIGNATURE }} />,
    );
    expect(getByTestId(`${testID}-bottom-left-text`)).toBeTruthy();
    expect(getByTestId(`${testID}-bottom-right-image`)).toBeTruthy();
  });
});
