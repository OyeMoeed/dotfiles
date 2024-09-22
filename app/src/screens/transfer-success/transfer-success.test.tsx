import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import constants from '@app/constants/constants';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { fireEvent, render } from '@testing-library/react-native';
import TransferSuccessScreen from './transfer-success.screen';

jest.mock('@app/components/molecules/ipay-toast/context/ipay-toast-context');
jest.mock('@app/localization/hooks/localization.hook');
jest.mock('@app/styles/hooks/theme.hook');
jest.mock('@app/utilities/clip-board.util');
jest.mock('@app/navigation/navigation-service.navigation');

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary50: '#f0f0f0',
      primary100: '#d0d0d0',
      primary450: '#00ff00',
      primary800: '#007700',
      primary900: '#004400',
    },
    secondary: {
      secondary50: '#e0e0e0',
      secondary100: '#c0c0c0',
    },
    tertiary: {
      tertiary500: '#fff',
    },
    natural: {
      natural500: '#888888',
      natural900: '#444444',
    },
    bottomsheetGradient: ['#fff', '#eee'],
  },
}));

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  TOP_UP: {
    TRANSFER_SUCCESSFUL: 'Transfer Successful',
    REF_NUMBER_COPIED: 'Reference Number Copied',
    SHARE: 'Share',
  },
  COMMON: {
    HOME: 'Home',
    SAR: 'SAR',
  },
  TRANSACTION_HISTORY: {
    VAT_INVOICE: 'VAT Invoice',
  },
}));

describe('TransferSuccessScreen', () => {
  const bankDetailsMock = {
    icon: 'bank-icon.png',
    title: 'Bank Title',
    bankName: 'Bank Name',
    accountNumber: '1234567890',
  };

  const beneficiaryDetailsMock = [
    { title: 'Detail 1', subTitle: 'Sub Detail 1', icon: 'icon.png' },
    { title: 'Detail 2', subTitle: 'Sub Detail 2', icon: 'icon.png' },
  ];

  beforeEach(() => {
    useToastContext.mockReturnValue({ showToast: jest.fn() });
    constants.BANK_DETAILS = bankDetailsMock;
    constants.BENEFICIARY_DETAILS = beneficiaryDetailsMock;
  });

  it('renders success message correctly', () => {
    const { getByText } = render(<TransferSuccessScreen />);
    expect(getByText('3000 SAR')).toBeTruthy();
  });

  it('renders beneficiary bank details correctly', () => {
    const { getByText } = render(<TransferSuccessScreen />);
    expect(getByText(bankDetailsMock.title)).toBeTruthy();
    expect(getByText(` | ${bankDetailsMock.bankName}`)).toBeTruthy();
    expect(getByText(bankDetailsMock.accountNumber)).toBeTruthy();
  });

  it('renders transfer items correctly', () => {
    const { getByText } = render(<TransferSuccessScreen />);
    beneficiaryDetailsMock.forEach((item) => {
      expect(getByText(item.title)).toBeTruthy();
      expect(getByText(item.subTitle)).toBeTruthy();
    });
  });

  it('updates state to shareable when share button is pressed', () => {
    const { getByText } = render(<TransferSuccessScreen />);
    const shareButton = getByText('TOP_UP.SHARE');
    fireEvent.press(shareButton);
    expect(shareButton).toBeTruthy();
  });

  it('navigates to home when home button is pressed', () => {
    const { getByText } = render(<TransferSuccessScreen />);
    const homeButton = getByText('COMMON.HOME');
    fireEvent.press(homeButton);
    expect(resetNavigation).toHaveBeenCalledWith(ScreenNames.HOME_BASE);
  });
});
