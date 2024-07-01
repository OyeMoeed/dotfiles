import { fireEvent, render } from '@testing-library/react-native';
import IPayCounterButton from './ipay-counter-button.comonent';

describe('IPayCounterButton', () => {
  it('renders correctly with the given Counter Button', () => {
    // Act
    const { getByTestId } = render(
      <IPayCounterButton onPressUp={onPressUp} testID="isCountDownButton" onPressDown={onPressDown} />,
    );

    const isShowIcon = getByTestId('isCountDownButton');
    fireEvent.press(isShowIcon);
  });
});
