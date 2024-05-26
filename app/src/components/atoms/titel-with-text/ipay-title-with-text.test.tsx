import { render } from '@testing-library/react-native';
import React from 'react';
import IPayTitleWithText from './ipay-title-with-text.component';

describe('IPayTitleWithText', () => {
  test('renders heading and text correctly', () => {
    const heading = 'Title';
    const text = 'This is some text.';
    const { getByText } = render(<IPayTitleWithText heading={heading} text={text} />);

    // Assert that the heading and text are rendered correctly
    expect(getByText(heading)).toBeDefined();
    expect(getByText(text)).toBeDefined();
  });
});
