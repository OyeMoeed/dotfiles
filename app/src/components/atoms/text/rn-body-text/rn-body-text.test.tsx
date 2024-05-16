import { render } from '@testing-library/react-native';
import React from 'react';
import RNText from '../rn-base-text/rn-text.component';
import RNBodyText from './rn-body-text.component';

describe('RNBodyText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNBodyText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNBodyText>
        <RNText>Hello Children</RNText>
      </RNBodyText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNBodyText testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByTestId } = render(<RNBodyText testID="rn-text-component" text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByTestId('rn-text-component');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
