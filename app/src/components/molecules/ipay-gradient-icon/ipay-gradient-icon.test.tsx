// IpayGradientIcon.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import IpayGradientIcon from './ipay-gradient-icon.component'; // Adjust the import path if needed

describe('IpayGradientIcon', () => {
  it('renders correctly with default props', () => {
    const { toJSON } = render(<IpayGradientIcon icon="info-circle" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies custom size', () => {
    const size = 50;
    const { getByTestId } = render(<IpayGradientIcon icon="info-circle" size={size} />);
    const maskedView = getByTestId('masked-view'); // Assuming `masked-view` is assigned as testID

    // Check the size of the masked view
    expect(maskedView).toHaveStyle({ height: size, width: size });
  });

  it('applies custom gradient colors', () => {
    const gradientColors = ['#FF5733', '#FFBD33'];
    const { getByTestId } = render(<IpayGradientIcon icon="info-circle" gradientColors={gradientColors} />);

    const gradientView = getByTestId('gradient-view'); // Assuming `gradient-view` is assigned as testID

    // Check if the gradient colors are applied (this depends on how the gradient component is implemented)
    // For the purpose of this test, we assume gradient colors are passed correctly to IPayLinearGradientView
    expect(gradientView.props.gradientColors).toEqual(gradientColors);
  });

  it('handles removeInlineStyle prop', () => {
    const { toJSON } = render(<IpayGradientIcon icon="info-circle" removeInlineStyle />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles disableFill prop', () => {
    const { toJSON } = render(<IpayGradientIcon icon="info-circle" disableFill />);
    expect(toJSON()).toMatchSnapshot();
  });
});
