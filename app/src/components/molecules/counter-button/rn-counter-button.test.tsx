import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RNCounterButton from './rn-counter-button.comonent';
import images from '@app/assets/images';
import ArrowDownSVG from '@app/assets/svgs/arrow-down.icon';

describe('RNCounterButton', () => {
  it('renders correctly with the given Counter Button', () => {
    // Act
    const { getByTestId } = render(
      <RNCounterButton
        onPressUp={() => console.log('pressedUp')}
        testID={'isCountDownButton'}
        onPressDown={() => console.log('PressedDown')}
      />
    );

    const isShowIcon = getByTestId('isCountDownButton');
    fireEvent.press(isShowIcon);
  });
});
