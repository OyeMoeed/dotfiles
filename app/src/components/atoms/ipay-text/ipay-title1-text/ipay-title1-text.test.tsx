import { render } from '@testing-library/react-native';
import React from 'react';
import IPayTitle1Text from './ipay-title1-text.component';

describe('IPayTitle1Text Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayTitle1Text text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayTitle1Text>
        <IPayTitle1Text>Hello Children</IPayTitle1Text>
      </IPayTitle1Text>,
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayTitle1Text testID="test-id" />);
    expect(getByTestId('test-id-title-text-base-text')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPayTitle1Text text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
