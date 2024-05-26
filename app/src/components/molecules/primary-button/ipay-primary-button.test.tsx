import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import IPayPrimaryButton from './ipay-primary-button.components';

describe('IPayButtonWithBackgroundAnd', () => {
  test('renders correctly with default props', () => {
    const { getByTestId } = render(
      <IPayPrimaryButton
        testID="rn-button"
        btnText="Button"
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    const button = getByTestId('rn-button');
    expect(button).toBeDefined();
  });

  test('renders correctly with small prop', () => {
    const { getByTestId } = render(
      <IPayPrimaryButton
        testID="rn-button"
        btnText="Button"
        small
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    const button = getByTestId('rn-button');
    expect(button).toBeDefined();
  });

  test('renders correctly with medium prop', () => {
    const { getByTestId } = render(
      <IPayPrimaryButton
        btnText="Button"
        testID="rn-button"
        medium
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    const button = getByTestId('rn-button');
    expect(button).toBeDefined();
  });

  test('renders correctly with large prop', () => {
    const { getByTestId } = render(
      <IPayPrimaryButton
        btnText="Button"
        testID="rn-button"
        large
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    const button = getByTestId('rn-button');
    expect(button).toBeDefined();
  });

  test('calls onPress prop when clicked', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<IPayPrimaryButton btnText="Button" testID="rn-button" onPress={onPressMock} />);
    const button = getByTestId('rn-button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
