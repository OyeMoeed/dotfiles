import icons from '@app/assets/icons';
import { render } from '@testing-library/react-native';
import IPayFailure from './ipay-failure.component';

jest.mock('@app/styles/hooks/theme.hook');

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary50: '#f0f0f0',
      primary500: '#007700',
    },
    secondary: {
      secondary50: '#e0e0e0',
      secondary100: '#c0c0c0',
    },
    tertiary: {
      tertiary500: '#fff',
    },
    natural: {
      natural500: '#888888',
      natural900: '#444444',
    },
    error: {
      error500: '#000',
    },
  },
}));

describe('IPayFailure', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <IPayFailure testID="test-id" headingText="Error" descriptionText="Something went wrong" />,
    );
    expect(getByTestId('test-id-failure-base-view')).toBeTruthy();
  });

  it('displays the correct heading and description texts', () => {
    const { getByText } = render(
      <IPayFailure testID="test-id" headingText="Error" descriptionText="Something went wrong" />,
    );

    expect(getByText('Error')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('renders the failure icon correctly', () => {
    const { getByTestId } = render(
      <IPayFailure testID="test-id" headingText="Error" descriptionText="Something went wrong" />,
    );

    const icon = getByTestId('test-id-failure-base-view').findByProps({ icon: icons.danger12 });
    expect(icon).toBeTruthy();
  });
});
