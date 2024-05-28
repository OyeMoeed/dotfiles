import { render } from '@testing-library/react-native';
import React from 'react';
import IPayHeadlineText from './ipay-headline-text.component';

describe('IPayHeadlineText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayHeadlineText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayHeadlineText>
        <IPayHeadlineText>Hello Children</IPayHeadlineText>
      </IPayHeadlineText>,
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayHeadlineText testID="test-id" />);
    expect(getByTestId('test-id-headline-text-base-text')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPayHeadlineText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
