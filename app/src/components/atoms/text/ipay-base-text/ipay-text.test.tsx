import { render } from '@testing-library/react-native';
import React from 'react';
import IPayText from './ipay-text.component';

describe('IPayText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayText>
        <IPayText>Hello Children</IPayText>
      </IPayText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayText testID="test-id" />);
    expect(getByTestId('test-id-base-text')).toBeTruthy();
  });

  it('renders with custom style', () => {
    const customStyle = { color: 'red' };
    const { getByText } = render(<IPayText text="Custom Style" style={customStyle} />);
    const textComponent = getByText('Custom Style');
    expect(textComponent.props.style).toContain(customStyle);
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPayText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
