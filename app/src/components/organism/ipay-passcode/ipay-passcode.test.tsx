import { fireEvent, render } from '@testing-library/react-native';
import IPayPasscode from './ipay-passcode.component';

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    colors: {
      primary: { primary800: '#000000', primary500: '' },
      natural: { natural0: '' },
    },
  }),
}));

describe('IPayPasscode', () => {
  const testID = 'test-passcode';
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];

  it('renders correctly', () => {
    const { getByTestId } = render(<IPayPasscode testID={testID} data={data} />);
    const component = getByTestId(`${testID}-passcode-component-base-view`);
    expect(component).toBeTruthy();
  });

  it('fills pin boxes when digits are pressed', () => {
    const { getByText, getByTestId } = render(<IPayPasscode testID={testID} data={data} />);
    const digit1 = getByText('1');
    fireEvent.press(digit1);
    const digit2 = getByText('2');
    fireEvent.press(digit2);

    expect(getByTestId(`${testID}-pin-box-0-base-view`).props.style).toContainEqual(
      expect.objectContaining({
        // Update with the actual filled pin box style object
      }),
    );
    expect(getByTestId(`${testID}-pin-box-1-base-view`).props.style).toContainEqual(
      expect.objectContaining({
        // Update with the actual filled pin box style object
      }),
    );
  });

  it('removes digits when backspace is pressed', () => {
    const { getByText, getByTestId } = render(<IPayPasscode testID={testID} data={data} />);
    const digit1 = getByText('1');
    fireEvent.press(digit1);
    const digit2 = getByText('2');
    fireEvent.press(digit2);

    const backspace = getByText('⌫');
    fireEvent.press(backspace);
  });
});
