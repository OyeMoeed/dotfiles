import { fireEvent, render } from '@testing-library/react-native';
import GiftDetailsScreen from './gift-details.screen';

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary50: '#f0f0f0',
      primary500: '#007700',
      primary800: '#005500',
    },
    secondary: {
      secondary50: '#e0e0e0',
      secondary100: '#c0c0c0',
    },
    tertiary: {
      tertiary500: '#fff',
    },
    natural: {
      natural0: '#ffffff',
      natural500: '#888888',
      natural900: '#444444',
    },
    warning: {
      warning500: '#ffa500',
      warning600: '#cc8400',
    },
    error: {
      error500: '#ff0000',
    },
  },
}));

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  SEND_GIFT: {
    GIFT_CARD_MESSAGE: 'Happy Eid!',
    GIFT_CARD_NAME: 'John Doe',
    GIFT_DETAILS: 'Gift Details',
    SWIPE_TO_FLIP: 'Swipe to Flip',
    FROM: 'From',
  },
  TOP_UP: {
    SHARE: 'Share',
    REF_NUMBER_COPIED: 'Reference number copied',
  },
  COMMON: {
    SAR: 'SAR',
  },
  passcode_error: 'Passcode Error',
}));

// Mock useToastContext hook
jest.mock('@app/components/molecules/ipay-toast/context/ipay-toast-context', () => ({
  useToastContext: () => ({
    showToast: jest.fn(),
  }),
}));

// Mock constants
jest.mock('@app/constants/constants', () => ({
  GIFT_CARD_DETAILS: [
    { title: 'Transfer Date', subTitle: '2023-07-20T12:00:00Z', icon: 'copy' },
    { title: 'Status', subTitle: 'UNOPENED' },
  ],
  BUTTON_TYPES: {
    PRIMARY: 'primary',
    LINK_BUTTON: 'link_button',
  },
}));

describe('GiftDetailsScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<GiftDetailsScreen />);

    expect(getByText('Gift Details')).toBeTruthy();
    expect(getByText('Happy Eid!')).toBeTruthy();
    expect(getByText('From: John Doe')).toBeTruthy();
  });

  it('renders gift card details correctly', () => {
    const { getByText } = render(<GiftDetailsScreen />);

    expect(getByText('Transfer Date')).toBeTruthy();
    expect(getByText('17:00 - 20/07/2023')).toBeTruthy(); // formatted date
    expect(getByText('UNOPENED')).toBeTruthy();
  });

  it('flips the card on button press', () => {
    const { getByText } = render(<GiftDetailsScreen />);
    const flipButton = getByText('UNOPENED');

    fireEvent.press(flipButton);
  });
});
