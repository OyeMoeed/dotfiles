import React from 'react';
import { render } from '@testing-library/react-native';
import RNText from './rn-text.component';

describe('RNText Component', () => {
  test('renders text correctly', () => {
    const text = 'Hello, world!';
    const { getByText } = render(<RNText text={text} />);
    const textElement = getByText(text);
    expect(textElement).toBeDefined();
  });
});
