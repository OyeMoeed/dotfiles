import { render } from '@testing-library/react-native';
import React from 'react';
import RNSubHeadlineText from './rn-sub-headline-text.component';

describe('RNSubHeadlineText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNSubHeadlineText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNSubHeadlineText>
        <RNSubHeadlineText>Hello Children</RNSubHeadlineText>
      </RNSubHeadlineText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNSubHeadlineText testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<RNSubHeadlineText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
