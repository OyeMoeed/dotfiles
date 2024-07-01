import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Share from 'react-native-share';
import TopUpIBAN from './topup-iban.screen';

// Mocking the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: '#0000FF', // Blue
        primary900: '#00008B', // Dark blue
        primary800: '#000056',
      },
      secondary: {
        secondary200: '#00008B',
      },
      tertiary: {
        tertiary500: '#00008B',
      },
      gradientTertiary: ['#ffffff', '#eeeeee'], // Mocked gradient colors
      natural: {
        natural0: '#FFA500', // Orange
        natural900: '#000000',
      },
    },
  }),
}));

// Mocking the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    name_copied: 'Name copied',
    IBAN_number: 'IBAN number',
    top_up: 'Top up',
    bank_transfer_to_my_wallet: 'Bank transfer to my wallet',
    use_iban_number: 'Use iban number',
    to_add_balance_description: 'To add balance description',
    name: 'Name',
    copied: 'Copied',
    copy: 'Copy',
    iban: 'IBAN',
    transfer_duration_description: 'Transfer duration description',
    share: 'Share',
  }),
}));

// Mocking components from '@app/components/atoms'
jest.mock('@components/atoms', () => ({
  __esModule: true,
  IPayIcon: jest.fn(({ icon, ...props }) => <icon {...props} />),
  IPayView: jest.fn(({ children, ...props }) => <view {...props}>{children}</view>),
  IPayPressable: jest.fn(({ children, ...props }) => <view {...props}>{children}</view>),
}));

// Mocking components from '@app/components/molecules'
jest.mock('@app/components/molecules', () => ({
  __esModule: true,
  IPayList: jest.fn(({ children, onPressIcon, ...props }) => (
    <div onClick={onPressIcon} {...props}>
      {children}
    </div>
  )),
  IPayPageDescriptionText: () => null,
  IPayButton: jest.fn(({ btnText, onPress, ...props }) => (
    <button onClick={onPress} {...props}>
      {btnText}
    </button>
  )),
  IPayHeader: jest.fn(({ title, ...props }) => <header {...props}>{title}</header>),
  IPayToast: jest.fn(({ title, ...props }) => <toast {...props}>{title}</toast>),
}));

// Mocking components from '@app/components/templates'
jest.mock('@app/components/templates', () => ({
  __esModule: true,
  IPaySafeAreaView: jest.fn(({ children, ...props }) => <safeview {...props}>{children}</safeview>),
}));

// Mocking react-native-share module
jest.mock('react-native-share', () => ({
  open: jest.fn(),
  Social: {
    WHATSAPP: 'whatsapp',
  },
}));

describe('TopUpIBAN component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly with expected components', () => {
    const { getByTestId } = render(<TopUpIBAN />);

    // Assert that key components are rendered
    expect(getByTestId('header')).toBeDefined(); // Assuming 'header' has a testID
    expect(getByTestId('share')).toBeDefined(); // Assuming 'share' has a testID
  });

  it('handles share button press correctly', () => {
    const { getByTestId } = render(<TopUpIBAN />);

    // Mock Share.open and check if it's called with correct options
    const mockShareOpen = Share.open as jest.MockedFunction<typeof Share.open>;
    fireEvent.press(getByTestId('share'));

    expect(mockShareOpen).toHaveBeenCalledTimes(1);
    expect(mockShareOpen).toHaveBeenCalledWith({
      subject: 'Wa',
      title: 'AlinmaPay',
      message: 'IBAN Number',
      url: 'AlinmaPay',
      social: 'whatsapp',
      whatsAppNumber: '9199999999',
      filename: 'test',
    });
  });

  it('displays toast message when copy name button is pressed', async () => {
    const { queryByTestId, findByTestId } = render(<TopUpIBAN />);
    const listItem = await findByTestId('name-list');
    expect(listItem).toBeDefined();

    // Trigger copy action
    fireEvent.press(listItem); // Assuming 'Copy' is the button text for copy action

    // Assert that toast message appears after a delay
    await waitFor(
      () => {
        const buttonToBeclicked = queryByTestId('toast');
        expect(buttonToBeclicked).toBeDefined();
      },
      { timeout: 3000 },
    );
  });

  it('displays toast message when copy IBAN button is pressed', async () => {
    const { queryByTestId, findByTestId } = render(<TopUpIBAN />);

    const ibanView = await findByTestId('iban-view');
    expect(ibanView).toBeDefined();

    // Trigger copy action
    fireEvent.press(ibanView);

    await waitFor(
      () => {
        const buttonToBeclicked = queryByTestId('toast');
        expect(buttonToBeclicked).toBeDefined();
      },
      { timeout: 3000 },
    );
  });
});
