import { render } from '@testing-library/react-native';
import React from 'react';
import IPayTitle3Text from './ipay-title3-text.component';

describe('IPayTitle3Text Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayTitle3Text text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayTitle3Text>
        <IPayTitle3Text>Hello Children</IPayTitle3Text>
      </IPayTitle3Text>
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayTitle3Text testID="test-id" />);
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPayTitle3Text text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
