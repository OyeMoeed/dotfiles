import { render } from '@testing-library/react-native';
import React from 'react';
import IPayFootnoteText from './ipay-footnote-text.component';

describe('IPayFootnoteText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayFootnoteText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayFootnoteText>
        <IPayFootnoteText>Hello Children</IPayFootnoteText>
      </IPayFootnoteText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayFootnoteText testID="test-id" />);
    expect(getByTestId('test-id-footnote-text-base-text')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPayFootnoteText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
