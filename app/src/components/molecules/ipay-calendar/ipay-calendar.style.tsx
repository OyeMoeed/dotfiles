import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const CalendarStyles = (colors: any) =>
  createStyleSheet({
    calenderHeaderWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: moderateScale(16),
    },
    monthYearTextView: { flexDirection: 'row', alignItems: 'center', gap: moderateScale(5) },
    chevrons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    datePicker: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: colors.natural.natural0,
      top: moderateScale(100),
    },
    DatePickerAndroidStyle: {
      backgroundColor: colors.natural.natural100,
      width: '100%',
    },
    month: { fontSize: moderateScale(16) },
  });

export default CalendarStyles;
