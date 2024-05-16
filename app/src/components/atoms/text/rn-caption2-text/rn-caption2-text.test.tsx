import { render } from '@testing-library/react-native';
import React from 'react';
import RNCaption1Text from '../rn-caption1-text/rn-caption1-text.component';

describe('RNCaption1Text Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<RNCaption1Text text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <RNCaption1Text>
        <RNCaption1Text>Hello Children</RNCaption1Text>
      </RNCaption1Text>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<RNCaption1Text testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<RNCaption1Text text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
