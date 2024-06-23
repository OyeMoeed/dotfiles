import { render } from '@testing-library/react-native';
import IdentitySuccessMessage from './identity-success-message.screen';

// Mocking required dependencies
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    colors: {
      natural: { natural0: '' },
      gradientTertiary: ['#ffffff', '#eeeeee'], // Mocked gradient colors
      tertiary: { tertiary400: '#cccccc', primary500: '#aaaaaa' }, // Mocked tertiary colors
      primary: { primary50: '#dddddd', primary800: '#bbbbbb' }, // Mocked primary colors
      secondary: { secondary50: '#999999' } // Mocked secondary colors
    },
    icons: {
      logoAlinmaPay: jest.fn(),
      successIconGif: jest.fn(),
    }
  })
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    identity_confirmation: 'Identity successful!',
    utilize_app_feature: 'Explore and enjoy our features.',
    done: 'Done',
  })
}));

describe('IdentitySuccessMessage', () => {
  it('renders the component with the header when bottom view is not visible', () => {
    const { getByText, queryByTestId } = render(<IdentitySuccessMessage />);

    // Header should be rendered when bottom view is not visible
    expect(getByText('Explore and enjoy our features.')).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();

    // Bottom view should not be rendered
    expect(queryByTestId('bottom-view')).toBeNull();
  });
});
