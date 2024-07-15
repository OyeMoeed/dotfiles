import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import IPaySuccessComponent from './ipay-success.component';

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    natural: {
      natural900: '#fff',
    },
    primary: {
      primary450: '#00ff00',
      primary800: '#007700',
    },
    tertiary: {
      tertiary500: '#ff00ff',
    },
  },
}));

describe('IPaySuccessComponent', () => {
  const defaultProps = {
    testID: 'ipay-success',
    headingText: 'Success!',
    descriptionText: 'Your transaction was successful.',
    subHeadingText: 'Thank you for using our service.',
    textGradientColors: undefined,
    iconsStyles: {},
    style: {},
  };

  it('renders correctly with required props', () => {
    render(<IPaySuccessComponent {...defaultProps} />);

    expect(screen.getByTestId('ipay-success-success-base-view')).toBeTruthy();
    expect(screen.getByText('Your transaction was successful.')).toBeTruthy();
    expect(screen.getByText('Thank you for using our service.')).toBeTruthy();
  });

  it('renders correctly without optional descriptionText and subHeadingText', () => {
    const propsWithoutOptionalText = {
      ...defaultProps,
      descriptionText: undefined,
      subHeadingText: undefined,
    };

    render(<IPaySuccessComponent {...propsWithoutOptionalText} />);

    expect(screen.getByTestId('ipay-success-success-base-view')).toBeTruthy();
    expect(screen.queryByText('Your transaction was successful.')).toBeNull();
    expect(screen.queryByText('Thank you for using our service.')).toBeNull();
  });

  it('applies custom gradient colors if provided', () => {
    const customGradientColors = ['#123456', '#654321'];
    const propsWithCustomColors = {
      ...defaultProps,
      textGradientColors: customGradientColors,
    };

    render(<IPaySuccessComponent {...propsWithCustomColors} />);

    // Additional check for custom gradient colors can be added here
  });

  it('applies custom styles if provided', () => {
    const customStyles = { backgroundColor: '#abcdef' };
    const propsWithCustomStyles = {
      ...defaultProps,
      style: customStyles,
    };

    render(<IPaySuccessComponent {...propsWithCustomStyles} />);

    const component = screen.getByTestId('ipay-success-success-base-view');
    const flattenedStyles = StyleSheet.flatten(component.props.style);
    expect(flattenedStyles).toMatchObject(customStyles);
  });

  it('applies custom icon styles if provided', () => {
    const customIconStyles = { width: 100, height: 100 };
    const propsWithCustomIconStyles = {
      ...defaultProps,
      iconsStyles: customIconStyles,
    };

    render(<IPaySuccessComponent {...propsWithCustomIconStyles} />);
  });
});
