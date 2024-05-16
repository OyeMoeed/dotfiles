import { render } from '@testing-library/react-native';
import React from 'react';
import RNTitle3Text from './rn-title3-text.component';

describe('RNTitle3Text Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNTitle3Text text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNTitle3Text>
        <RNTitle3Text>Hello Children</RNTitle3Text>
      </RNTitle3Text>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNTitle3Text testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<RNTitle3Text text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
