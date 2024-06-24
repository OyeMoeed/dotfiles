import { fireEvent, render } from '@testing-library/react-native';
import IPayOutlineButton from './ipay-outline-button.component';

describe('IPayOutlineButton', () => {
  test('renders correctly with default props', () => {
    const { getByText } = render(
      <IPayOutlineButton
        testID="rn-button"
        btnText="Press Me"
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const button = getByText('Press Me');
    expect(button).toBeDefined();
  });

  test('renders correctly with small prop', () => {
    const { getByText } = render(
      <IPayOutlineButton
        testID="rn-button"
        btnText="Press Me"
        small
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const button = getByText('Press Me');
    expect(button).toBeDefined();
  });

  test('renders correctly with medium prop', () => {
    const { getByText } = render(
      <IPayOutlineButton
        testID="rn-button"
        btnText="Press Me"
        medium
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const button = getByText('Press Me');
    expect(button).toBeDefined();
  });

  test('renders correctly with large prop', () => {
    const { getByText } = render(
      <IPayOutlineButton
        testID="rn-button"
        btnText="Press Me"
        large
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const button = getByText('Press Me');
    expect(button).toBeDefined();
  });

  test('calls onPress prop when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<IPayOutlineButton btnText="Press Me" testID="rn-button" onPress={onPressMock} />);
    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
