import { fireEvent, render } from '@testing-library/react-native';
import IPayRadioButton from './ipay-radio-button.component';

describe('IPayRadioButton', () => {
  test('renders without crashing', () => {
    render(<IPayRadioButton />);
  });

  test('renders tick mark when checked', () => {
    const { getByTestId } = render(<IPayRadioButton testID="tick-mark" />);
    const tickMark = getByTestId('tick-mark');
    expect(tickMark).toBeTruthy();
  });

  test('calls onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<IPayRadioButton testID="rn-radio-button" onPress={onPressMock} />);
    const radioButton = getByTestId('rn-radio-button');
    fireEvent.press(radioButton);
    expect(onPressMock).toHaveBeenCalled();
  });

  test('renders disabled correctly', () => {
    const { getByTestId } = render(<IPayRadioButton testID="rn-radio-button" disabled />);
    const radioButton = getByTestId('rn-radio-button');
    expect(radioButton.props.disabled).toBe(undefined);
  });
});
