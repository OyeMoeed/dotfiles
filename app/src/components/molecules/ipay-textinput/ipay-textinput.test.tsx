import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { fireEvent, render } from '@testing-library/react-native';
import IPayTextInput from './ipay-textinput.component';

jest.mock(
  '@app/assets/svgs/svg',
  () =>
    function () {
      return <IPayIcon icon={icons.SEARCH} size={18} />;
    }
);

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: 'blue'
      },
      natural: {
        natural300: 'gray'
      },
      error: {
        error500: 'red'
      }
    }
  })
}));

describe('IPayTextInput Component', () => {
  const onChangeText = jest.fn(); // Mocking onChangeText function
  const label = 'Label'; // Example label
  const rightIcon = <IPayIcon icon={icons.SEARCH} size={18} />; // Assuming User is a valid component

  it('renders text correctly', () => {
    const { getByDisplayValue } = render(
      <IPayTextInput
        text="Input Labels"
        onChangeText={() => {}}
        label="Label"
        rightIcon={<IPayIcon icon={icons.SEARCH} size={18} />} // Use your SVG icon component with testID
      />
    );

    expect(getByDisplayValue('Input Labels')).toBeTruthy();
  });

  it('triggers onFocus and onBlur callbacks', () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const { getByDisplayValue } = render(
      <IPayTextInput
        text="Enter text..."
        onChangeText={onChangeText}
        label={label}
        rightIcon={rightIcon}
        onFocus={onFocusMock}
        onBlur={onBlurMock}
      />
    );

    const inputElement = getByDisplayValue('Enter text...');
    fireEvent(inputElement, 'focus');
    expect(onFocusMock).toHaveBeenCalled();

    fireEvent(inputElement, 'blur');
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('triggers onChangeText callback', () => {
    const onChangeTextMock = jest.fn();
    const { getByDisplayValue } = render(
      <IPayTextInput text="Enter text..." onChangeText={onChangeTextMock} label={label} rightIcon={rightIcon} />
    );

    const inputElement = getByDisplayValue('Enter text...');
    fireEvent.changeText(inputElement, 'New text');
    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });

  it('renders right icon when provided', () => {
    // Render the component with the right icon
    const { getByTestId } = render(
      <IPayTextInput
        testID="rightIcon"
        text=""
        onChangeText={() => {}}
        rightIcon={<IPayIcon icon={icons.SEARCH} size={18} />} // Use your SVG icon component with testID
        label={label}
      />
    );

    // Verify that the right icon is rendered
    const rightIconElement = getByTestId('rightIcon-text-input-base-view');
    expect(rightIconElement).toBeTruthy();
  });

  it('does not render right icon when not provided', () => {
    // Render the component without the right icon
    const { queryByTestId } = render(<IPayTextInput text="" onChangeText={() => {}} label={label} />);

    // Verify that the right icon is not rendered
    const rightIconElement = queryByTestId('rightIcon');
    expect(rightIconElement).toBeNull();
  });
});
