import { render } from '@testing-library/react-native';
import React from 'react';
import RNLargeTitleText from './rn-large-title-text.component';

describe('RNLargeTitleText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNLargeTitleText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNLargeTitleText>
        <RNLargeTitleText>Hello Children</RNLargeTitleText>
      </RNLargeTitleText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNLargeTitleText testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<RNLargeTitleText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
