import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import IPayAnimatedTextInput from './ipay-animated-input-text.component';

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn().mockImplementation((key) => key),
  }),
}));

const mockedUseTheme = require('@app/styles/hooks/theme.hook').default;

describe('IPayAnimatedTextInput', () => {
  beforeEach(() => {
    mockedUseTheme.mockReturnValue({
      colors: {
        natural: {
          natural500: '#CCCCCC',
        },
        primary: {
          primary500: '#FF0000',
        },
        redPalette: {
          red500: '',
        },
      },
      icons: {
        close: () => <div testID="closeIcon" />,
      },
    });
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <IPayAnimatedTextInput
        label="Test Label"
        onChangeText={(txt) => console.debug()}
        rightIcon={<div testID="rightIcon" />}
        showLeftIcon={true}
        onClearInput={jest.fn()}
      />,
    );

    expect(getByText('Test Label')).toBeTruthy();
    expect(getByTestId('rightIcon')).toBeTruthy();
    expect(getByTestId('closeIcon')).toBeTruthy();
  });

  it('handles focus and blur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    const { getByText } = render(
      <IPayAnimatedTextInput
        onChangeText={(txt) => console.debug()}
        label="Test Label"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
    );

    const textInput = getByText('Test Label');
    expect(handleBlur).toHaveBeenCalled();
  });

  it('updates input value correctly', () => {
    const handleChangeText = jest.fn();

    const { getByText } = render(<IPayAnimatedTextInput label="Test Label" onChangeText={handleChangeText} />);

    const textInput = getByText('Test Label');

    fireEvent.changeText(textInput, 'New Value');
  });

  it('displays assistive text correctly', () => {
    const { getByText } = render(
      <IPayAnimatedTextInput
        onChangeText={(txt) => console.debug()}
        label="Test Label"
        assistiveText="Assistive Text"
      />,
    );

    expect(getByText('Assistive Text')).toBeTruthy();
  });

  it('displays error assistive text correctly', () => {
    const { getByText } = render(
      <IPayAnimatedTextInput
        label="Test Label"
        onChangeText={(txt) => console.debug()}
        assistiveText="Error Text"
        isError={true}
      />,
    );

    expect(getByText('Error Text')).toBeTruthy();
  });

  it('handles clear input button press', () => {
    const handleClearInput = jest.fn();

    const { getByTestId } = render(
      <IPayAnimatedTextInput
        onChangeText={(txt) => console.debug()}
        label="Test Label"
        showLeftIcon={true}
        onClearInput={handleClearInput}
      />,
    );

    fireEvent.press(getByTestId('closeIcon'));
  });
});
