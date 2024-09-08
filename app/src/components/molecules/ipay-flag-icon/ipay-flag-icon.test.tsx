import React from 'react';
import { render } from '@testing-library/react-native';
import IpayFlagIcon from './ipay-flag-icon.component'; // Assuming this is the correct path to your component

describe('IpayFlagIcon', () => {
  const country = 'invalidCountry';
  it('renders nothing with invalid country prop', () => {
    const { queryByTestId } = render(<IpayFlagIcon country={country} testID="ipay-us" />); // Provide an invalid country prop
    const svgElement = queryByTestId('ipay-us-flag-icon'); // Assuming you have a test ID for the SVG element
    expect(svgElement).toBeNull();
  });
});
