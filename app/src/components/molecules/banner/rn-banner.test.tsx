import React from 'react';
import { render } from '@testing-library/react-native';
import RNBanner from './rn-banner.component';

describe('RNBanner', () => {
  it('renders correctly with the given text and colored variant', () => {
    // Arrange
    const testText = 'Test Banner';
    const testVariant = 'colored'; // Directly using the string value

    // Act
    const { getByText } = render(<RNBanner testID="test-banner" text={testText} variant={testVariant} />);

    // Assert
    expect(getByText(testText)).toBeTruthy();
  });

  it('applies correct background color based on natural variant', () => {
    // Arrange
    const testText = 'Test Banner';
    const testVariant = 'natural'; // Directly using the string value
    const expectedBackgroundColor = '#E9E9E9'; // Assuming this is the color for 'natural' variant

    // Act
    const { getByTestId } = render(<RNBanner testID="test-banner" text={testText} variant={testVariant} />);

    const componentContainer = getByTestId('test-banner');

    // Extract the style prop
    const styleArray = componentContainer.props.style;

    // Flatten the style array
    const flattenStyles = (styleArray) => {
      if (Array.isArray(styleArray)) {
        return styleArray.reduce((acc, style) => ({ ...acc, ...style }), {});
      }
      return styleArray;
    };

    const flattenedStyles = flattenStyles(styleArray);

    // Assert
    expect(flattenedStyles.backgroundColor).toBe(expectedBackgroundColor);
  });
});
