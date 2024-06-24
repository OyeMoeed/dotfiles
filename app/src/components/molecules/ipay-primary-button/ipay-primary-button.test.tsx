import { fireEvent, render } from '@testing-library/react-native';
import IPayPrimaryButton from './ipay-primary-button.components';

describe('IPayButtonWithBackgroundAnd', () => {
  test('renders correctly with default props', () => {
    const { getByText } = render(
      <IPayPrimaryButton
        testID="rn-button"
        btnText="Button"
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const button = getByText('Button');
    expect(button).toBeDefined();
  });

  test('renders correctly with small prop', () => {
    const { getByText } = render(
      <IPayPrimaryButton
        testID="rn-button"
        btnText="Button"
        small
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const button = getByText('Button');
    expect(button).toBeDefined();
  });

  test('renders correctly with medium prop', () => {
    const { getByText } = render(
      <IPayPrimaryButton
        btnText="Button"
        testID="rn-button"
        medium
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const button = getByText('Button');
    expect(button).toBeDefined();
  });

  test('renders correctly with large prop', () => {
    const { getByText } = render(
      <IPayPrimaryButton
        btnText="Button"
        testID="rn-button"
        large
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const button = getByText('Button');
    expect(button).toBeDefined();
  });

  test('calls onPress prop when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<IPayPrimaryButton btnText="Button" testID="rn-button" onPress={onPressMock} />);
    const button = getByText('Button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
