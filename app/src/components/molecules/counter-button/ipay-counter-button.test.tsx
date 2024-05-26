import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IPayCounterButton from './ipay-counter-button.comonent';

describe('RNCounterButton', () => {
  it('renders correctly with the given Counter Button', () => {
    // Act
    const { getByTestId } = render(
      <IPayCounterButton
        onPressUp={() => console.log('pressedUp')}
        testID={'isCountDownButton'}
        onPressDown={() => console.log('PressedDown')}
      />
    );

    const isShowIcon = getByTestId('isCountDownButton');
    fireEvent.press(isShowIcon);
  });
});
