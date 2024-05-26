import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import IPayCheckbox from './ipay-checkbox.component';

describe('IPayCheckbox', () => {
  test('renders checked checkbox when clicked', () => {
    const { getByTestId } = render(<IPayCheckbox testID="rn-checkbox" />);
    const checkbox = getByTestId('rn-checkbox');
    fireEvent.press(checkbox);
  });

  test('invokes onPress callback when clicked', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<IPayCheckbox testID="rn-checkbox" onPress={onPressMock} />);
    const checkbox = getByTestId('rn-checkbox');

    fireEvent.press(checkbox);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
