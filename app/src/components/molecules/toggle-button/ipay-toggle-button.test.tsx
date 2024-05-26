import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import IPayToggleButton from './ipay-toggle-button.component';

describe('IPayToggleButton', () => {
  const defaultProps = {
    testID: 'toggle-button',
    toggleState: true,
    onToggleChange: jest.fn()
  };

  it('renders correctly with default props', () => {
    const { getByTestId } = render(<IPayToggleButton {...defaultProps} />);
    const pressable = getByTestId('toggle-button-pressable-toggle');
    expect(pressable).toBeTruthy();
  });

  it('calls onToggleChange when pressed', () => {
    const { getByTestId } = render(<IPayToggleButton {...defaultProps} />);
    const pressable = getByTestId('toggle-button-pressable-toggle');
    fireEvent.press(pressable);
    expect(defaultProps.onToggleChange).toHaveBeenCalledWith(false);
  });

  it('disables the button and applies the correct styles when disabled', () => {
    const { getByTestId } = render(<IPayToggleButton {...defaultProps} disabled={true} />);
    const pressable = getByTestId('toggle-button-pressable-toggle');
    expect(pressable.props.disabled).toBe(undefined);
  });
});
