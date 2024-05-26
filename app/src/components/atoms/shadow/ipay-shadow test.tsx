import { variants } from '@app/utilities/enums.util';
import { render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import IPayShadow from './ipay-shadow.component';
import { IPayShadowProps } from './ipay-shadow.interface';

// Mock the IPayView component
jest.mock('../view/rn-view.component', () => {
  const { View } = require('react-native');
  return ({ children, style, testID }: any) => (
    <View testID={testID} style={style}>
      {children}
    </View>
  );
});

// Mock the enums
jest.mock('@app/utilities/enums.util', () => ({
  variants: {
    WARNING: 'warning',
    NEUTRAL: 'neutral',
    SUCCESS: 'success',
    SEVERE: 'severe',
    NATURAL: 'natural',
    COLORED: 'colored',
    NORMAL: 'normal',
    SECONDARY: 'secondary',
    PRIMARY: 'primary'
  }
}));

// Mock the styles function
jest.mock('./ipay-shadow.styles', () => (variant: variants) => {
  const getBackgroundColor = (variant: variants) => {
    if (variant === 'natural') {
      return 'natural200';
    } else {
      return 'transparent';
    }
  };

  const getShadowStyle = (variant: variants) => {
    if (variant === 'normal') {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3
      };
    } else if (variant === 'primary') {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5
      };
    } else if (variant === 'secondary') {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10
      };
    } else {
      return {};
    }
  };

  return {
    container: {
      backgroundColor: getBackgroundColor(variant),
      ...getShadowStyle(variant),
      borderRadius: 10,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: 'red'
    },
    font: {
      color: 'secondary500',
      padding: 10
    }
  };
});

describe('RNShadow Component', () => {
  const renderComponent = (props: IPayShadowProps) => render(<IPayShadow {...props} />);

  it('renders correctly with default variant', () => {
    const { getByTestId } = renderComponent({
      testID: 'ipay-shadow',
      variant: variants.NATURAL,
      children: <React.Fragment />
    });
    const shadowComponent = getByTestId('ipay-shadow');

    expect(shadowComponent).toBeTruthy();
  });

  it('applies the correct styles based on variant', () => {
    const { getByTestId, rerender } = renderComponent({
      testID: 'ipay-shadow',
      variant: variants.PRIMARY,
      children: <React.Fragment />
    });
    const shadowComponent = getByTestId('ipay-shadow');

    // Check initial variant styles
    expect(shadowComponent.props.style).toMatchObject({
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5,
      backgroundColor: 'transparent',
      borderRadius: 10,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16
    });

    // Rerender with different variant and check styles again
    rerender(<IPayShadow testID="ipay-shadow" variant={variants.COLORED} children={<React.Fragment />} />);
    expect(shadowComponent.props.style).toMatchObject({
      backgroundColor: 'transparent',
      borderRadius: 10,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: 'red'
    });
  });

  it('renders children correctly', () => {
    const { getByTestId } = renderComponent({
      testID: 'ipay-shadow',
      variant: variants.COLORED,
      children: <View testID="child-view" />
    });
    const childView = getByTestId('child-view');

    expect(childView).toBeTruthy();
  });
});
