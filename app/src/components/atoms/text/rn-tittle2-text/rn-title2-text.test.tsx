import { render } from '@testing-library/react-native';
import React from 'react';
import RNTitle2Text from './rn-title2-text.component';

describe('RNTitle2Text Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNTitle2Text text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNTitle2Text>
        <RNTitle2Text>Hello Children</RNTitle2Text>
      </RNTitle2Text>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNTitle2Text testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<RNTitle2Text text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
