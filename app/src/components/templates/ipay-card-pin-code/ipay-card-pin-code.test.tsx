import { fireEvent, render } from '@testing-library/react-native';
import IPayCardPinCode from './ipay-card-pin-code.component';

// Mocking modules
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    CARDS: {
      ENTER_CARD_PIN_CODE: 'Enter Card PIN Code',
      INCORRECT_CODE: 'Incorrect Code',
      VERIFY_CODE_ACCURACY: 'Verify Code Accuracy',
    },
  }),
}));

jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      natural: {
        natural0: '#ffffff',
      },
    },
  }),
}));

// Mocking Clipboard module
jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

jest.mock('@app/assets/images', () => ({
  securityCard: 'security-card.png',
}));

jest.mock('@app/components/molecules/ipay-toast/context/ipay-toast-context', () => ({
  __esModule: true,
  useToastContext: () => ({
    showToast: jest.fn(),
  }),
}));

jest.mock('@app/components/organism', () => ({
  __esModule: true,
  IPayPasscode: jest.fn(({ onEnterPassCode }) => (
    <input onChange={(e) => onEnterPassCode(e.target.value)} value="0000" testID="passcode-input" />
  )),
}));

describe('<IPayCardPinCode />', () => {
  it('renders IPayCardPinCode component correctly', () => {
    const { getByText } = render(<IPayCardPinCode />);

    expect(getByText('Enter Card PIN Code')).toBeDefined();
  });

  it('enters pin code', () => {
    const { getByTestId } = render(<IPayCardPinCode />);
    const passcodeInput = getByTestId('passcode-input');

    fireEvent.changeText(passcodeInput, '0000');
    expect(passcodeInput.props.value).toBe('0000');
  });
});
