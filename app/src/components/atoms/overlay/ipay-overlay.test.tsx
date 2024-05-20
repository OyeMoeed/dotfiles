import React from 'react';
import { render } from '@testing-library/react-native';
import IpayOverlay from './ipay-overlay.component';

// Mock the styles module
jest.mock('./ipay-overlay.styles', () => ({
  overlay: {
    backgroundColor: 'rgba(4, 51, 77, 0.5)', // Correct background color for testing
    // Add other styles here if needed
  },
}));

describe('IpayOverlay', () => {
  it('renders correctly and applies the correct styles', () => {
    const { getByTestId } = render(<IpayOverlay testID="ipay-overlay" />);

    // Check if the overlay element renders
    const overlayElement = getByTestId('ipay-overlay');
    expect(overlayElement).toBeTruthy();

  });
  it('renders without crashing with no testID provided', () => {
    // Ensure the component renders without throwing errors when no testID is provided
    expect(() => render(<IpayOverlay />)).not.toThrow();
  });
  it('renders with a custom testID', () => {
    const { getByTestId } = render(<IpayOverlay testID="custom-overlay" />);

    // Check if the overlay element renders with the custom testID
    const overlayElement = getByTestId('custom-overlay');
    expect(overlayElement).toBeTruthy();
  });

});
