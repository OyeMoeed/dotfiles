import { CardCategories } from '@app/utilities/enums.util';
import { render } from '@testing-library/react-native';
import IPayATMCard from './ipay-atm-card.component';

// Mock dependencies
jest.mock('@app/assets/images', () => ({
  logo: 'mock_logo',
  mada: 'mock_mada',
  visa: 'mock_visa',
  textLogoLight: 'mock_textLogoLight',
  classicBg: 'mock_classicBg',
  platinumBg: 'mock_platinumBg',
  signatureBg: 'mock_signatureBg',
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      classicCardGradient: 'mock_classicCardGradient',
      platinumCardGradient: 'mock_platinumCardGradient',
      signatureCardGradient: 'mock_signatureCardGradient',
      primary: { primary900: 'red' },
      natural: '#fff',
    },
  }),
}));

// Mock cardCategories enum
jest.mock('@app/utilities/enums.util', () => ({
  cardCategories: {
    CLASSIC: 'classic',
    PLATINUM: 'platinum',
    SIGNATURE: 'signature',
  },
}));

// Mock IPayATMCardProps
const mockProps = {
  item: {
    cardHeaderText: 'Mock Card Header Text',
    name: 'Mock Name',
    cardNumber: '1234 5678 9101 1121',
    cardVariant: CardCategories.CLASSIC,
  },
};

describe('IPayATMCard', () => {
  const testID = 'test-id';
  it('renders correctly', () => {
    const { getByTestId } = render(<IPayATMCard testID={testID} {...mockProps} />);

    expect(getByTestId(`${testID}-base-view`)).toBeTruthy();
    expect(getByTestId(`${testID}-footnote-text-base-text`)).toBeTruthy();
  });

  it('renders correctly with default classic card variant', () => {
    const { getByText, getByTestId } = render(<IPayATMCard testID={testID} {...mockProps} />);

    expect(getByText(mockProps.item.cardHeaderText)).toBeTruthy();
    expect(getByText(mockProps.item.name)).toBeTruthy();
    expect(getByText(mockProps.item.cardNumber)).toBeTruthy();
    expect(getByTestId(`${testID}-bottom-left-image`)).toBeTruthy();
    expect(getByTestId(`${testID}-bottom-right-image`)).toBeTruthy();
  });

  it('renders correct with platinum card variant', () => {
    const { getByTestId } = render(
      <IPayATMCard testID={testID} {...mockProps} item={{ ...mockProps.item, cardVariant: CardCategories.PLATINUM }} />,
    );
    expect(getByTestId(`${testID}-bottom-left-base-text`)).toBeTruthy();
    expect(getByTestId(`${testID}-bottom-right-image`)).toBeTruthy();
  });

  it('renders correctly with signature card variant', () => {
    const { getByTestId } = render(
      <IPayATMCard
        testID={testID}
        {...mockProps}
        item={{ ...mockProps.item, cardVariant: CardCategories.SIGNATURE }}
      />,
    );
    expect(getByTestId(`${testID}-bottom-left-base-text`)).toBeTruthy();
    expect(getByTestId(`${testID}-bottom-right-image`)).toBeTruthy();
  });
});
