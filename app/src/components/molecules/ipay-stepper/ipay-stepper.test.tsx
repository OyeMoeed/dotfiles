import { fireEvent, render } from '@testing-library/react-native';
import IPayStepper from './ipay-stepper.comonent';

describe('RNCounterButton', () => {
  it('renders correctly', () => {
    // Act
    const { getByTestId } = render(<IPayStepper testID="isStepper" />);

    const isShowIcon = getByTestId('isStepper-base-view');
    fireEvent.press(isShowIcon);
  });
  it('renders correctly with the given Counter Function', () => {
    // Act
    const { getByTestId } = render(
      <IPayStepper
        onPressUp={() => console.log('pressedUp')}
        testID="isStepper"
        onPressDown={() => console.log('PressedDown')}
      />,
    );

    const isShowIcon = getByTestId('isStepper-base-view');
    fireEvent.press(isShowIcon);
  });
});
