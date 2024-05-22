import { render } from '@testing-library/react-native';
import React from 'react';
import IPayText from '../ipay-base-text/ipay-text.component';
import IPayBodyText from './ipay-body-text.component';

describe('IPayBodyText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayBodyText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayBodyText>
        <IPayText>Hello Children</IPayText>
      </IPayBodyText>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayBodyText testID="test-id" />);
    expect(getByTestId('test-id-body-text-base-text')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByTestId } = render(
      <IPayBodyText testID="ipay-text-component" text="Multiple Lines" numberOfLines={2} />
    );
    const textComponent = getByTestId('ipay-text-component-body-text-base-text');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
