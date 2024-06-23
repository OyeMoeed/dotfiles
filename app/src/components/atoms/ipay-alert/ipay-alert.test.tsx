import { fireEvent, render } from '@testing-library/react-native';
import IPayAlert from './ipay-alert.component';

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      backgrounds: {
        backdrop: '#000000', // Provide a mock color value
      },
      primary: {
        primary900: '#0000',
      },
      natural: {
        natural0: '#0000',
      },
      redShades: {
        red500: '#0000',
      },
      greyShades: {
        grey100: '#0000',
      },
    },
  }),
}));

// Mock enums and components
jest.mock('@app/utilities/enums.util', () => ({
  alertType: {
    DEFAULT: 'default',
    SIDE_BY_SIDE: 'sideBySide',
    STACKED: 'stacked',
  },
  alertVariant: {
    DEFAULT: 'default',
    DESTRUCTIVE: 'destructive',
  },
  buttonVariants: {
    FILLED: 'filled',
    OUTLINED: 'outlined',
  },
}));

jest.mock('@app/assets/svgs/check', () => 'Warning');
jest.mock('@app/assets/svgs/warning', () => 'Warning');
jest.mock('@app/components/molecules', () => ({
  IPayButton: jest.fn(({ btnText, onPress, variant }) => (
    <button onClick={onPress} data-variant={variant}>
      {btnText}
    </button>
  )),
}));

jest.mock('./ipay-alert.styles', () => ({
  centeredView: {},
  modalView: {},
  textsView: {},
  modalTitle: {},
  modalMessage: {},
  sideBySideContainer: {},
  buttonContainer: {},
  flexStyles: {},
}));

describe('IpayAlert', () => {
  const renderComponent = (props = {}) =>
    render(<IPayAlert title="Focus Test" message="Focus on this input" visible {...props} />);

  it('renders correctly with default props', () => {
    const { getByText } = renderComponent({ title: 'Test Title', message: 'Test Message' });

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Message')).toBeTruthy();
  });

  it('calls handleFocus when focused', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <IPayAlert
        title="Focus Test"
        message="Focus on this input"
        visible
        primaryAction={{ text: 'Primary', onPress }}
        testID="ipay-uniquie"
      />,
    );
    const primaryAction = getByTestId('ipay-uniquie'); // Adjust the query to match your input element
    fireEvent.press(primaryAction);
  });
});
