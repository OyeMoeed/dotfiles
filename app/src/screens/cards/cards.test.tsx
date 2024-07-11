import { render } from '@testing-library/react-native';
import Cards from './cards.screen';

jest.mock('./cards.constant', () => jest.fn());

// Mocking the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      natural: {
        natural900: '#FFA500',
      },
      primary: {
        primary800: '#00BAFE33',
      },
    },
  }),
}));

// Mocking the localization hook
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    CARDS: {
      CARDS: 'Cards',
      CASHBACK: 'CASHBACK',
      YOU_DO_NOT_HAVE_CARD: "You don't have any cards.",
      CREATE_NEW_CARD: 'Create New Card',
    },
  }),
}));

jest.mock('@app/components/templates', () => ({
  __esModule: true,
  IPaySafeAreaView: jest.fn((props) => <view testID={props.testID}>{props.children}</view>),
}));

jest.mock('@app/components/molecules', () => ({
  __esModule: true,
  IPayNoResult: jest.fn((props) => <view testID={props.testID}>{props.children}</view>),
  IPayButton: jest.fn((props) => <button type="submit">{props.children}</button>),
  IPayCarousel: jest.fn((props) => <view>{props.children}</view>),
}));

jest.mock('@app/components/atoms', () => ({
  IPayView: jest.fn((props) => <view>{props.children}</view>),
  IPayTitle2Text: jest.fn((props) => <view>{props.children}</view>),
  IPayIcon: jest.fn((props) => <icon>{props.children}</icon>),
}));

describe('Cards', () => {
  it('renders correctly with localization', () => {
    const { queryByText } = render(<Cards />);

    expect(queryByText('Cards')).toBeDefined();
  });

  it('renders correctly with card data', () => {
    jest.doMock('./cards.constant', () => [{ id: 1, name: 'Card 1' }]);
    const { getByTestId } = render(<Cards />);
    expect(getByTestId('ipay-safearea')).toBeDefined();
  });

  it('renders correctly with no card data', () => {
    jest.doMock('./cards.constant', () => ({
      __esModule: true,
      default: [],
    }));

    const { getByTestId } = render(<Cards />);

    expect(getByTestId('no-result')).toBeDefined();
  });
});
