import { fireEvent, render } from '@testing-library/react-native';
import IPayOtpInputText from './ipay-otp-input-text.component';

describe('IPayOtpInputText', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<IPayOtpInputText testID="otp-input" />);
    expect(getByTestId('otp-input-otp-input')).toBeDefined();
  });

  it('calls onChangeText when input changes', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(<IPayOtpInputText testID="otp-input" onChangeText={onChangeText} />);

    fireEvent.changeText(getByTestId('otp-input-otp-input'), '1234');

    expect(onChangeText).toHaveBeenCalledWith('1234');
  });

  it('applies error style when isError is true', () => {
    const { getByTestId } = render(<IPayOtpInputText testID="otp-input" isError />);

    const input = getByTestId('otp-input-otp-input');
  });

});
