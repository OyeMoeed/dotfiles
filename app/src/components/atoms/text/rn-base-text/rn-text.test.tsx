import { render } from '@testing-library/react-native';
import React from 'react';
import RNText from './rn-text.component';

describe('RNText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNText>
        <RNText>Hello Children</RNText>
      </RNText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNText testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with custom style', () => {
    const customStyle = { color: 'red' };
    const { getByText } = render(<RNText text="Custom Style" style={customStyle} />);
    const textComponent = getByText('Custom Style');
    expect(textComponent.props.style).toContain(customStyle);
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<RNText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
