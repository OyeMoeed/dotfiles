import { render } from '@testing-library/react-native';
import React from 'react';
import IPayText from './ipay-text.component';

describe('IPayText Component', () => {
  test('renders text correctly', () => {
    const text = 'Hello, world!';
    const { getByText } = render(<IPayText text={text} />);
    const textElement = getByText(text);
    expect(textElement).toBeDefined();
  });
});
