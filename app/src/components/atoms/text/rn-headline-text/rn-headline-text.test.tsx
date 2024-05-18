import { render } from '@testing-library/react-native';
import React from 'react';
import RNHeadlineText from './rn-headline-text.component';

describe('RNHeadlineText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNHeadlineText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNHeadlineText>
        <RNHeadlineText>Hello Children</RNHeadlineText>
      </RNHeadlineText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNHeadlineText testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<RNHeadlineText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
