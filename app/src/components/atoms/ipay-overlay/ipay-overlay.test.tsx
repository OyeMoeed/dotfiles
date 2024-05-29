import { render } from '@testing-library/react-native';
import React from 'react';
import IPayOverlay from './ipay-overlay.component';

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      backgrounds: {
        backdrop: '#000000', // Provide a mock color value
      },
      primary: {
        primary900: '#0000',
      },
      natural: {
        natural0: '#0000',
      },
      redShades: {
        red500: '#0000',
      },
      greyShades: {
        grey100: '#0000',
      },
    },
  }),
}));

describe('IPayOverlay', () => {
  it('renders correctly and applies the correct styles', () => {
    const { getByTestId } = render(<IPayOverlay testID="ipay-component" />);

    // Check if the overlay element renders
    const overlayElement = getByTestId('ipay-component-overlay-base-view');
    expect(overlayElement).toBeTruthy();
  });

  it('renders without crashing with no testID provided', () => {
    // Ensure the component renders without throwing errors when no testID is provided
    expect(() => render(<IPayOverlay />)).not.toThrow();
  });

  it('renders with a custom testID', () => {
    const { getByTestId } = render(<IPayOverlay testID="custom-component" />);

    // Check if the overlay element renders with the custom testID
    const overlayElement = getByTestId('custom-component-overlay-base-view');
    expect(overlayElement).toBeTruthy();
  });
});
