import constants from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { useTypedSelector } from '@app/store/store';
import { fireEvent, render } from '@testing-library/react-native';
import TransferInformation from './transfer-information.screen';

jest.mock('@app/store/store');
jest.mock('@app/localization/hooks/localization.hook');
jest.mock('@app/constants/use-constants');
jest.mock('@app/components/molecules/ipay-account-balance/ipay-account-balance.component', () => 'IPayAccountBalance');

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  TRANSFER: { TRANSFER_INFRORMATION: 'Transfer Information' },
  COMMON: { NEXT: 'Next' },
  TOP_UP: {
    AMOUNT_EXCEEDS_CURRENT: 'Amount exceeds current limit',
    MONTHLY_SPENDING_LIMIT_REACHED: 'Monthly spending limit reached',
  },
  TRANSACTION_HISTORY: { TRANSACTION_DETAILS: 'Transaction Details' },
}));

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#0000ff',
    },
    natural: {
      natural900: '#444444',
      natural700: '#666666',
      natural500: '#888888',
    },
    critical: {
      critical800: '#ff0000',
    },
    tertiary: {
      tertiary50: '#fff',
    },
    error: {
      error500: '#000',
    },
    success: {
      success500: '#fff',
    },
    secondary: {
      secondary500: '#000',
    },
    backgrounds: {
      backdrop: '#000',
    },
  },
}));

describe('TransferInformation', () => {
  const walletInfoMock = {
    limitsDetails: {
      monthlyRemainingOutgoingAmount: '1000',
      dailyRemainingOutgoingAmount: '1000',
      monthlyOutgoingLimit: '5000',
    },
    availableBalance: '2000',
    currentBalance: '1000',
  };

  const appDataMock = { hideBalance: false };
  const transferReasonDataMock = [
    { id: 1, text: 'Reason 1' },
    { id: 2, text: 'Reason 2' },
  ];

  beforeEach(() => {
    useTypedSelector.mockReturnValue({
      appData: appDataMock,
      walletInfo: walletInfoMock,
    });
    useConstantData.mockReturnValue({ transferReasonData: transferReasonDataMock });
  });

  it('renders correctly', () => {
    const { getByText } = render(<TransferInformation />);
    expect(getByText('TRANSFER.TRANSFER_INFRORMATION')).toBeTruthy();
  });

  it('renders account balance correctly', () => {
    const { getByText } = render(<TransferInformation />);
    expect(getByText('Transfer Information')).toBeTruthy();
    expect(getByText('Floyd Miles')).toBeTruthy();
  });

  it('renders transfer information correctly', () => {
    const { getByText } = render(<TransferInformation />);
    expect(getByText(constants.BANK_DETAILS.title)).toBeTruthy();
    expect(getByText(`| ${constants.BANK_DETAILS.bankName}`)).toBeTruthy();
    expect(getByText(constants.BANK_DETAILS.accountNumber)).toBeTruthy();
  });

  it('updates chip value based on transfer amount', () => {
    const { getByTestId } = render(<TransferInformation />);
    const amountInput = getByTestId('amount-input-input');
    fireEvent.changeText(amountInput, '6000');
  });

  it('triggers next button callback', () => {
    const { getByText } = render(<TransferInformation />);
    fireEvent.press(getByText('COMMON.NEXT'));
  });
});
