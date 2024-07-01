import { render } from '@testing-library/react-native';
import RegistrationSuccessful from './registration-successful.screen';

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
      faceId: jest.fn()
    }
  })
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    registration_success_message: 'Registration successful!',
    explore_and_enjoy_feature: 'Explore and enjoy our features.',
    done: 'Done',
    additional_feature: 'Additional feature',
    activate_face_id: 'Activate Face ID',
    allow_you_easy_access_to_account: 'Allow you easy access to your account.',
    setup_now: 'Set up now',
    skip_for_now: 'Skip for now'
  })
}));

describe('RegistrationSuccessful', () => {
  it('renders the component with the header when bottom view is not visible', () => {
    const { getByText, queryByTestId } = render(<RegistrationSuccessful />);

    // Header should be rendered when bottom view is not visible
    expect(getByText('Explore and enjoy our features.')).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();

    // Bottom view should not be rendered
    expect(queryByTestId('bottom-view')).toBeNull();
  });
});
