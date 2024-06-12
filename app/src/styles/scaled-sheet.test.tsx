import { ScaledSheet } from 'react-native-size-matters';
import createStyleSheet from './scaled-sheet.styles';

describe('createStyleSheet', () => {
  it('calls ScaledSheet.create with the provided style', () => {
    const style = {
      container: {
        flex: 1,
        padding: '10@ms',
      },
    };

    // Call the function with the test style
    createStyleSheet(style);

    // Verify that ScaledSheet.create was called with the correct argument
    expect(ScaledSheet.create).toHaveBeenCalledWith(style);
  });
});
