import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import IPayOutlineButton from './ipay-outline-button.component';

describe('IPayOutlineButton', () => {
  test('renders correctly with default props', () => {
    const { getByTestId } = render(
      <IPayOutlineButton
        testID="rn-button"
        btnText="Press Me"
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
      <IPayOutlineButton
        testID="rn-button"
        btnText="Press Me"
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
      <IPayOutlineButton
        testID="rn-button"
        btnText="Press Me"
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
      <IPayOutlineButton
        testID="rn-button"
        btnText="Press Me"
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
    const { getByTestId } = render(<IPayOutlineButton btnText="Press Me" testID="rn-button" onPress={onPressMock} />);
    const button = getByTestId('rn-button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
