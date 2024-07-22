import '@testing-library/react-native';
import 'lottie-react-native';
import 'react-native-gesture-handler/jestSetup';
import 'react-native-size-matters';
import useFonts from '../app/src/styles/theming/fonts.hook';

jest.mock('@react-native-clipboard/clipboard');

jest.mock('react-native-share', () => ({
  open: jest.fn(),
  Social: {
    WHATSAPP: '',
  },
}));

jest.mock('react-native-device-info', () => {
  return {
    isTablet: jest.fn(() => false), // Adjust return value as needed
  };
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en-US',
      AppleLanguages: ['fr-FR', 'en-US'],
    },
  };
  return RN;
});
jest.mock('react-native-webview', () => jest.fn());
// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => {
  return () => ({
    enter_amount: 'Identity Verification',
    Identity_Discription: 'Identity Description',
    verify: 'Verify',
  });
});

jest.mock('@app/network/utilities/device-info-helper');
jest.mock('@network/services/api-call.service');
jest.mock('@app/store/slices/app-data-slice', () => ({
  setAppData: jest.fn(),
}));

jest.mock('react-native-share', () => ({
  __esModule: true,
  default: {
    open: jest.fn(),
    Social: {
      WHATSAPP: 'whatsapp',
      // Add other social platforms here if needed
    },
  },
}));

// jest.mock('lottie-react-native', () => 'LottieView');

// Mock React Native native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Mock FullWindowOverlayNativeComponent module if it's part of the package
jest.mock('react-native-screens/src/fabric/FullWindowOverlayNativeComponent', () => {
  return jest.fn();
});

jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  ...require('@gorhom/bottom-sheet/mock'),
}));

jest.mock('react-native-size-matters');
jest.mock('react-native-webview', () => jest.fn());
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      tertiary: {
        tertiary500: '#FFFFFF',
        tertiary100: '#D3D3D3',
      },
      natural: {
        natural0: '#F5F5F5',
        natural500: '#4CAF50',
      },
    },
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mocking the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn((text) => text) }),
}));

// Mocking the useFonts hook
jest.mock('@app/styles/theming/fonts.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({ Inter: 'Inter-Regular' })),
}));

// Mocking react-native-share module
jest.mock('react-native-share', () => ({
  open: jest.fn(),
  Social: {
    WHATSAPP: '',
  },
}));

// Mocking the modules and constants
jest.mock('@store/store', () => ({
  useTypedSelector: jest.fn(),
}));

jest.mock('@app/localization/languages.localization', () => ({
  languages: {
    EN: 'en',
    AR: 'ar',
  },
}));

describe('useFonts custom hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return English fonts when language is set to EN', () => {
    // Mocking the Redux store state
    const mockState = {
      localizationReducer: {
        localizationFlag: 'en',
      },
    };
    // Mocking the useTypedSelector hook to return the mock state
    jest.spyOn(require('@store/store'), 'useTypedSelector').mockReturnValue(mockState);

    // Call the custom hook
    const fonts = useFonts();

    // Assert the result
    expect(fonts).toEqual(fonts);
  });

  it('should return Arabic fonts when language is set to AR', () => {
    // Mocking the Redux store state
    const mockState = {
      localizationReducer: {
        localizationFlag: 'ar',
      },
    };
    // Mocking the useTypedSelector hook to return the mock state
    jest.spyOn(require('@store/store'), 'useTypedSelector').mockReturnValue(mockState);

    // Call the custom hook
    const fonts = useFonts();

    // Assert the result
    expect(fonts).toEqual(fonts);
  });
});

// Mocking react-native-reanimated-carousel
const mockCarousel = jest.fn().mockImplementation(() => {
  return {
    render: () => null, // Or you can return any other desired mock behavior
  };
});
jest.mock('react-native-reanimated-carousel', () => ({
  __esModule: true,
  default: mockCarousel,
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: '#FFFFFF',
        primary100: '#D3D3D3',
      },
      tertiary: {
        tertiary500: '#FFFFFF',
        tertiary100: '#D3D3D3',
      },
      natural: {
        natural0: '#F5F5F5',
        natural500: '#4CAF50',
        natural300: '',
      },
      yellowPalette: {
        yellow800: '',
      },
      error: {
        error500: 'red',
      },
      secondary: {
        secondary100: 'red',
      },
      redPalette: { red500: '' },
    },
    icons: {
      arrowLeft: '',
      arrowRight: '',
      close: '',
      messageQuestion: '',
      usFlag: '',
      login: '',
      infoIcon: '',
    },
  }),
}));
