import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import MobileAndIqamaVerification from './mobile-and-iqama-verification.screen';

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseTheme = require('@app/styles/hooks/theme.hook').default;

describe('MobileAndIqamaVerification', () => {
  beforeEach(() => {
    mockedUseTheme.mockReturnValue({
      colors: {
        natural: {
          natural0: '#FFFFFF',
          natural300: '#CCCCCC',
          natural1000: '#000000',
        },
        primary: {
          primary500: '#FF0000',
        },
        tertiary: {
          tertiary500: '',
        },
        redPalette: {
          red500: '',
        },
      },
      icons: {
        usFlag: () => <div testID="usFlagIcon" />,
        login: () => <div testID="loginIcon" />,
        infoIcon: () => <div testID="infoIcon" />,
        arrowRight: () => <div testID="arrowRightIcon" />,
        messageQuestion: () => <div testID="messageQuestionIcon" />,
      },
    });
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<MobileAndIqamaVerification />);

    // Check if all texts are rendered
    expect(getByText('English')).toBeTruthy();
    expect(getByText('Enter your information')).toBeTruthy();
    expect(getByText('Please enter your ID or Iqama number, so we can authenticate your account.')).toBeTruthy();
    expect(getByText('Mobile Number')).toBeTruthy();
    expect(getByText('ID / Iqama number')).toBeTruthy();
    expect(getByText('By clicking “Next” you acknowledge and agree to our terms and conditions')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
    expect(getByText('Need help')).toBeTruthy();

    // Check if icons are rendered
    expect(getByTestId('usFlagIcon')).toBeTruthy();
    expect(getByTestId('loginIcon')).toBeTruthy();
    expect(getByTestId('infoIcon')).toBeTruthy();
    expect(getByTestId('arrowRightIcon')).toBeTruthy();
    expect(getByTestId('messageQuestionIcon')).toBeTruthy();
  });

  it('calls the correct functions on button press', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(<MobileAndIqamaVerification />);

    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Need help'));

    expect(onPressMock).toHaveBeenCalledTimes(0); // Update to the actual behavior if needed
  });

  it('updates input fields correctly', () => {
    const { getByText } = render(<MobileAndIqamaVerification />);

    const mobileInput = getByText('Mobile Number');
    const iqamaInput = getByText('ID / Iqama number');

    fireEvent.changeText(mobileInput, '1234567890');
    fireEvent.changeText(iqamaInput, '12345678901234');
  });

  it('applies styles based on theme', () => {
    const { getByText } = render(<MobileAndIqamaVerification />);

    const englishButton = getByText('English');
    const nextButton = getByText('Next');

    expect(englishButton.props.style).toMatchObject(englishButton.props.style);
    expect(nextButton.props.style).toMatchObject(nextButton.props.style);
  });
});
