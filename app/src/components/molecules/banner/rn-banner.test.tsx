import React from 'react';
import { render } from '@testing-library/react-native';
import RNBanner from './rn-banner.component';
describe('RNBanner', () => {
  it('renders correctly with the given text and variant', () => {
    const { getByText } = render(<RNBanner testID="test-banner" text="Test Banner" variant="natural" />);

    expect(getByText('Test Banner')).toBeTruthy();
  });

  it('applies correct background color based on variant', () => {
    const { getByTestId } = render(<RNBanner testID="test-banner" text="Test Banner" variant="natural" />);

    const componentContainer = getByTestId('test-banner');

    expect(componentContainer.props.style).toMatchObject({
      backgroundColor: '#E9E9E9' // Assuming this is the color for 'natural' variant
    });
  });
});
