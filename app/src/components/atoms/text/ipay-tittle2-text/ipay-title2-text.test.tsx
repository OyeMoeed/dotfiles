import { render } from '@testing-library/react-native';
import React from 'react';
import IPayTitle2Text from './ipay-title2-text.component';

describe('IPayTitle2Text Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayTitle2Text text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayTitle2Text>
        <IPayTitle2Text>Hello Children</IPayTitle2Text>
      </IPayTitle2Text>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayTitle2Text testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPayTitle2Text text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
