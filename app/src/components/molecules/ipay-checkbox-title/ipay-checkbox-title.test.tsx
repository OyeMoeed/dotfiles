import { fireEvent, render } from '@testing-library/react-native';
import IPayCheckboxTitle from './ipay-chekbox-title.component';

describe('IPayCheckboxTitle', () => {
  test('renders checkbox with heading and text correctly', () => {
    const heading = 'Checkbox Heading';
    const text = 'Checkbox Text';
    const { getByText, getByTestId } = render(
      <IPayCheckboxTitle testID="ipay-checkbox-title" heading={heading} text={text} />,
    );

    expect(getByText(heading)).toBeDefined();
    expect(getByText(text)).toBeDefined();

    // Assert that the checkbox is rendered
    expect(getByTestId('rn-checkbox-checkbox')).toBeDefined(); // Update the testID
  });

  test('calls onPress function when checkbox is pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<IPayCheckboxTitle testID="ipay-checkbox-title" onPress={onPressMock} />);
    const checkbox = getByTestId('rn-checkbox-checkbox'); // Update the testID

    // Simulate a press event on the checkbox
    fireEvent.press(checkbox);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
