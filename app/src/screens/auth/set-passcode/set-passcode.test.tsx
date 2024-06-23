import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { render } from '@testing-library/react-native';
import SetPasscode from './set-passcode.component';

// Mock the dependencies
jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());
jest.mock('@app/styles/hooks/theme.hook', () => jest.fn());

describe('SetPasscode', () => {
  const mockLocalization = {
    createPasscode: 'Create Passcode',
    enter_code_to_access_application: 'Enter the code to access the application',
  };
  const mockTheme = {
    colors: { primary: '#000' },
    icons: { bulkLock: () => <div testID="mockBulkLockIcon" /> },
  };

  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue(mockLocalization);
    (useTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<SetPasscode />);

    expect(getByText(mockLocalization.createPasscode)).toBeTruthy();
    expect(getByText(mockLocalization.enter_code_to_access_application)).toBeTruthy();
    expect(getByTestId('mockBulkLockIcon')).toBeTruthy();
  });
});
