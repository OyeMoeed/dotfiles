import { CardStatusIndication, CardStatusType } from '@app/utilities/enums.util';
import { render } from '@testing-library/react-native';
import IPayCardStatusIndication from './ipay-card-status-indication.component';

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    CARDS: {
      EXPIRING_SOON: 'Expiring Soon',
      CARD_EXPIRED: 'Card Expired',
      PLEASE_RENEW_CARD: 'Please renew your card',
      RENEW_CARD: 'Renew Card',
      ANNUAL_FEE_COLLECTION: 'Annual Fee Collection',
      ANNUAL_FEE_COLLECTION_FAILED: 'Annual Fee Collection Failed',
      ANNUAL_FEE_FAILED_MESSAGE: 'Failed to collect annual fee',
    },
    COMMON: {
      SAR: 'SAR',
      TOP_UP: 'Top Up',
    },
  }),
}));

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: { primary500: '#123123' },
      natural: { natural0: '#ffffff' },
      backgrounds: { greyOverlay: '#fff' },
      secondary: { secondary100: '#789789' },
      error: { error500: 'red' },
      tertiary: { tertiary50: '#334dfs' },
      critical: {
        critical25: '#FFFDE7',
        critical500: '#FFEB3B',
        critical800: '#735F00',
      },
    },
  }),
}));

describe('IPayCardStatusIndication', () => {
  const renderComponent = (props) => render(<IPayCardStatusIndication {...props} />);

  it('renders correctly with expiry warning status', () => {
    const { getByText } = renderComponent({
      cardStatusType: CardStatusType.WARNING,
      statusIndication: CardStatusIndication.EXPIRY,
    });

    expect(getByText('Expiring Soon')).toBeTruthy();
    expect(getByText('12 May 2024')).toBeTruthy();
    expect(getByText('Renew Card')).toBeTruthy();
  });

  it('renders correctly with expiry alert status', () => {
    const { getByText } = renderComponent({
      cardStatusType: CardStatusType.ALERT,
      statusIndication: CardStatusIndication.EXPIRY,
    });

    expect(getByText('Card Expired')).toBeTruthy();
    expect(getByText('Please renew your card')).toBeTruthy();
    expect(getByText('Renew Card')).toBeTruthy();
  });

  it('renders correctly with annual fee warning status', () => {
    const { getByText } = renderComponent({
      cardStatusType: CardStatusType.WARNING,
      statusIndication: CardStatusIndication.ANNUAL,
    });

    expect(getByText('Annual Fee Collection')).toBeTruthy();
    expect(getByText('12 May 2024')).toBeTruthy();
    expect(getByText('100 SAR')).toBeTruthy();
  });

  it('renders correctly with annual fee alert status', () => {
    const { getByText } = renderComponent({
      cardStatusType: CardStatusType.ALERT,
      statusIndication: CardStatusIndication.ANNUAL,
    });

    expect(getByText('Annual Fee Collection Failed')).toBeTruthy();
    expect(getByText('Failed to collect annual fee')).toBeTruthy();
    expect(getByText('Top Up')).toBeTruthy();
  });
});
