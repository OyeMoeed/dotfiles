
import { fireEvent, render } from '@testing-library/react-native';
import IPaySelectorInput from './ipay-selector-input.component';

// Mock the inputVariants enum
jest.mock('@app/utilities/enums.util', () => ({
  inputVariants: {
    CURRENCY: 'Currency',
    PHONE_NUMBER: 'PhoneNumber'
  }
}));

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: 'blue'
      },
      natural: {
        natural300: 'gray',
        natural500: 'darkgray',
      },
      error: {
        error500: 'red'
      }
    }
  })
}));

describe('IPaySelectorInput', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPaySelectorInput testID="texting" showIcon={false} text="Input Labels" />);
    expect(getByText('Input Labels')).toBeTruthy();
  });

  it('renders with the CURRENCY variant', () => {
    const { getByText } = render(
      <IPaySelectorInput
        testID="currencyField"
        text=""
        onChangeText={() => { }}
        onClearInput={() => { }}
        variant={MockedEnum.CURRENCY}
        showIcon={false}
      />,
      />,
    );
    expect(getByText('currency')).toBeTruthy();
  });

  it('triggers onChangeText callback correctly', () => {
    const onChangeTextMock = jest.fn();

    const { getByPlaceholderText } = render(
      <IPaySelectorInput
        testID="textField"
        text="Enter text..."
        onChangeText={onChangeTextMock}
        onClearInput={() => { }}
        variant={MockedEnum.CURRENCY}
        placeholder="Enter text..."
        showIcon={false}
      />,
      />,
    );

    const inputElement = getByPlaceholderText('Enter text...');
    fireEvent.changeText(inputElement, 'New text');
    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });

  it('renders with assistive text', () => {
    const { getByText } = render(
      <IPaySelectorInput
        testID="assistiveTextField"
        text=""
        onChangeText={() => { }}
        onClearInput={() => { }}
        variant={MockedEnum.PHONE_NUMBER}
        assistiveText="Assistive Text"
        showIcon={false}
      />,
      />,
    );
    expect(getByText('Assistive Text')).toBeTruthy();
  });

  it('renders with an error state', () => {
    const { getByText } = render(
      <IPaySelectorInput
        testID="errorField"
        text=""
        onChangeText={() => { }}
        onClearInput={() => { }}
        variant={MockedEnum.PHONE_NUMBER}
        isError
        assistiveText="Error Text"
        showIcon={false}
      />,
      />,
    );
    expect(getByText('Error Text')).toBeTruthy();
  });

  it('renders correctly with different props combinations', () => {
    const { getByPlaceholderText, getByText } = render(
      <IPaySelectorInput
        testID="comboField"
        text=""
        onChangeText={() => { }}
        onClearInput={() => { }}
        variant={MockedEnum.PHONE_NUMBER}
        placeholder="Enter text..."
        containerStyle={{ backgroundColor: 'red' }}
        headingStyles={{ color: 'blue' }}
        isError
        assistiveText="Error occurred"
        editable={false}
        showLeftIcon={false}
        countryCode="+1"
        currency="USD"
        showIcon={false}
      />,
      />,
    );

    expect(getByPlaceholderText('Enter text...')).toBeTruthy();
    expect(getByText('Error occurred')).toBeTruthy();
  });
});

