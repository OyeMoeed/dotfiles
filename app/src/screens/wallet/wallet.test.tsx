import { copyText } from '@app/utilities';
import Clipboard from '@react-native-clipboard/clipboard';

// Mocking Clipboard module
jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

describe('handleClickOnCopy', () => {
  beforeEach(() => {
    Clipboard.setString.mockClear(); // Clear mock calls before each test
  });

  it('should call Clipboard.setString with the correct string', () => {
    const textToCopy = 'Hello, World!';
    copyText(textToCopy);
    expect(Clipboard.setString).toHaveBeenCalledWith(textToCopy);
  });

  it('should call Clipboard.setString once', () => {
    const textToCopy = 'Hello, World!';
    copyText(textToCopy);
    expect(Clipboard.setString).toHaveBeenCalledTimes(1);
  });

  it('should not throw an error when copying text', () => {
    const textToCopy = 'Hello, World!';
    expect(() => copyText(textToCopy)).not.toThrow();
  });
});
