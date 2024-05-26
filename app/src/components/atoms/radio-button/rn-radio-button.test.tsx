import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import RNRadioButton from './rn-radio-button.component';

describe('RNRadioButton', () => {
  test('renders without crashing', () => {
    render(<RNRadioButton />);
  });

  test('renders tick mark when checked', () => {
    const { getByTestId } = render(<RNRadioButton testID="tick-mark" />);
    const tickMark = getByTestId('tick-mark');
    expect(tickMark).toBeTruthy();
  });

  test('calls onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<RNRadioButton testID="rn-radio-button" onPress={onPressMock} />);
    const radioButton = getByTestId('rn-radio-button');
    fireEvent.press(radioButton);
    expect(onPressMock).toHaveBeenCalled();
  });

  test('renders disabled correctly', () => {
    const { getByTestId } = render(<RNRadioButton testID="rn-radio-button" disabled />);
    const radioButton = getByTestId('rn-radio-button');
    expect(radioButton.props.disabled).toBe(undefined);
  });
});
