// IpayOverlay.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import IpayOverlay from './ipay-overlay.component';
import styles from './ipay-overlay.styles';

describe('IpayOverlay', () => {
  it('renders correctly and applies the correct styles', () => {
    const { getByTestId } = render(<IpayOverlay />);

    const overlayElement = getByTestId('ipay-overlay');

    expect(overlayElement).toBeTruthy();

  });
});
