import { render } from '@testing-library/react-native';
import React from 'react';
import RNFootnoteText from './rn-footnote-text.component';

describe('RNFootnoteText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNFootnoteText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNFootnoteText>
        <RNFootnoteText>Hello Children</RNFootnoteText>
      </RNFootnoteText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNFootnoteText testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<RNFootnoteText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
