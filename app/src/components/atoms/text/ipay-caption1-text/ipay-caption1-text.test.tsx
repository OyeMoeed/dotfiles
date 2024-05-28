import { render } from '@testing-library/react-native';
import React from 'react';
import IPayCaption1Text from './ipay-caption1-text.component';

describe('IPayCaption1Text Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayCaption1Text text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayCaption1Text>
        <IPayCaption1Text>Hello Children</IPayCaption1Text>
      </IPayCaption1Text>,
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayCaption1Text testID="test-id" />);
    expect(getByTestId('test-id-caption-text-base-text')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPayCaption1Text text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
