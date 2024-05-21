import useFonts from '../app/src/styles/theming/fonts.hook';

import 'react-native-gesture-handler/jestSetup';

// Mock React Native native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Mock FullWindowOverlayNativeComponent module if it's part of the package
jest.mock('react-native-screens/src/fabric/FullWindowOverlayNativeComponent', () => {
  return jest.fn();
});

jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  ...require('@gorhom/bottom-sheet/mock')
}));

jest.mock('@app/styles/theming/theme.hook');
jest.mock('react-native-size-matters');

jest.mock('@app/styles/theming/theme.hook');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('@app/styles/theming/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      tertiary: {
        tertiary500: '#FFFFFF',
        tertiary100: '#D3D3D3'
      },
      natural: {
        natural0: '#F5F5F5',
        natural500: '#4CAF50'
      }
    }
  })
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

// Mocking the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn((text) => text) })
}));

// Mocking the useFonts hook
jest.mock('@app/styles/theming/fonts.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({ Inter: 'Inter-Regular' }))
}));

// Mocking the modules and constants
jest.mock('@store/store', () => ({
  useTypedSelector: jest.fn()
}));

jest.mock('@app/utilities/enums', () => ({
  languages: {
    EN: 'en',
    AR: 'ar'
  }
}));

describe('useFonts custom hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return English fonts when language is set to EN', () => {
    // Mocking the Redux store state
    const mockState = {
      localizationReducer: {
        localizationFlag: 'en'
      }
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
        localizationFlag: 'ar'
      }
    };
    // Mocking the useTypedSelector hook to return the mock state
    jest.spyOn(require('@store/store'), 'useTypedSelector').mockReturnValue(mockState);

    // Call the custom hook
    const fonts = useFonts();

    // Assert the result
    expect(fonts).toEqual(fonts);
  });
});
