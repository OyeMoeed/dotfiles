import useFonts from './fonts.hook';

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
