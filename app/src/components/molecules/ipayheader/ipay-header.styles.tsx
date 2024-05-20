import colors from '@app/styles/colors';
import { SCALE_24, SCALE_4 } from '@app/styles/spacing';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCALE_24,

  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: SCALE_4
  },
  title: {
    color: colors.primary.primary900,
    textAlign: 'center'
  },
  flexStyles: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',

  },
  rightStyles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: SCALE_4
  },
  back: {
    color: colors.primary.primary500
  }
});
