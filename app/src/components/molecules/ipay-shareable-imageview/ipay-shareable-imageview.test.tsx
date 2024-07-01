import { fireEvent, render } from '@testing-library/react-native';
import Share from 'react-native-share';
// Import the component to test
import { IPayView } from '@app/components/atoms';
import IPayShareableImageView from './ipay-shareable-imageview.component';

// Mock dependencies
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: {
    useTheme: () => ({
      colors: {
        primary: {
          primary500: 'blue' // Mock primary color for testing
        }
      }
    })
  }
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    share: 'Share' // Mock localization text
  })
}));

jest.mock('react-native-share', () => ({
  __esModule: true,
  default: {
    open: jest.fn() // Mock Share.open function
  }
}));
// Mock NativeModules.SettingsManager for iOS
jest.mock('react-native', () => ({
  NativeModules: {
    SettingsManager: {
      settings: {
        AppleLocale: 'en_US', // Mock the AppleLocale value
        AppleLanguages: ['en', 'fr', 'de'] // Mock the AppleLanguages array
      }
    },
    Platform: {
      OS: 'ios' // Mock Platform.OS as 'ios'
    }
  }
}));

describe('IPayShareableImageView', () => {
  it('should capture and share image when button is pressed', async () => {
    const { getByTestId } = render(
      <IPayShareableImageView testID="shareButton" shareButtonStyles={{ backgroundColor: 'red' }}>
        <IPayView></IPayView>
      </IPayShareableImageView>
    );

    // Mock capture function of ViewShot
    const mockCapture = jest.fn(() => Promise.resolve('/mock/image-uri.png'));
    const mockViewShotRef = {
      current: {
        capture: mockCapture
      }
    };

    // Simulate button press to trigger shareImage function
    fireEvent.press(getByTestId('shareButton-shareableView'));

    // Assert that capture function is called
    expect(mockCapture).toHaveBeenCalled();

    // Simulate successful capture
    await expect(mockCapture()).resolves.toBe('/mock/image-uri.png');

    // Assert that Share.open is called with expected parameters
    expect(Share.open).toHaveBeenCalledWith({
      url: '/mock/image-uri.png',
      title: 'Share file',
      message: 'Share captured image /mock/image-uri.png',
      subject: 'nmnm',
      failOnCancel: false
    });
  });
});
