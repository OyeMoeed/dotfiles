import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import IPayButtonWithBackgroundAndIcons from './ipay-button-with-background-and-icons.components';

describe('IPayButtonWithBackgroundAndIcons', () => {
  test('renders correctly with default props', () => {
    const { getByTestId } = render(
      <IPayButtonWithBackgroundAndIcons
        testID="rn-button"
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
      <IPayButtonWithBackgroundAndIcons
        testID="rn-button"
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
      <IPayButtonWithBackgroundAndIcons
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
      <IPayButtonWithBackgroundAndIcons
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
    const { getByTestId } = render(<IPayButtonWithBackgroundAndIcons testID="rn-button" onPress={onPressMock} />);
    const button = getByTestId('rn-button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
