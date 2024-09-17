import { render } from '@testing-library/react-native';
import IPayLanguageSheet from './ipay-language-sheet.component'; // Check this import path

// Mock the necessary hooks and dependencies
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    cancel: 'Cancel',
    language: 'Language',
  }),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      background: '#ffffff',
      lightColorPalette: {
        creamWhite: '#f9f9f9',
        white: '#fff',
        sheetBackdrop: '#F6F9FC',
      },
      overlays: {
        backdropColor: 'rgba(246, 249, 252, 0.9)',
        primaryBackDrop: 'rgba(4, 51, 77, 1)',
      },
      text: '#000000',
      natural: {
        natural0: '#FFFFFF',
        natural100: '#F8F8F8',
        natural200: '#E9E9E9',
        natural300: '#BDBDBD',
      },
      primary: {
        primary300: '#75DCFF',
        primary400: '#2CCBFF',
        primary500: '#00BAFE',
        primary600: '#0091D4',
        primary700: '#0073AB',
        primary800: '#00618D',
        primary900: '#04334D',
      },
    },
  }),
}));

jest.mock('./useLanguageChange', () => ({
  useLanguageChange: jest.fn(() => jest.fn()),
  useModalActions: jest.fn(() => ({
    bottomSheetModalRef: { current: { present: jest.fn(), dismiss: jest.fn() } },
    isOpen: true,
    handleClosePress: jest.fn(),
  })),
}));

describe('IPayLanguageSheet', () => {
  const renderComponent = (language = 'en', props = {}) => {
    return render(<IPayLanguageSheet testID="ipay-language" {...props} />);
  };
});
