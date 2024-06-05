import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import {
  SCALE_12,
  SCALE_16,
  SCALE_24,
  SCALE_28,
  SCALE_32,
  SCALE_34,
  SCALE_4,
  SCALE_70,
  SCALE_8,
  spacing
} from '@app/styles/spacing.const';

import { FONT_SIZE_11, FONT_SIZE_12, FONT_SIZE_14 } from '@app/styles/typography.styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCALE_24,
    paddingTop: SCALE_32,
    overflow:'hidden'
  },
  headingsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  commonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footnoteTextStyle: {
    marginRight: SCALE_8,
    color: colors.natural.natural500,
    fontWeight: '400',
    fontSize: FONT_SIZE_12
  },
  subheadingTextStyle: {
    marginRight: SCALE_8,
    fontWeight: '400',
    fontSize: FONT_SIZE_14,
    color: colors.primary.primary600
  },
  captionTextStyle: {
    fontWeight: '400',
    fontSize: FONT_SIZE_11,
    color: colors.orangePalette.orange500
  },
  historyContStyle: {
    width: '100%',
    height: SCALE_70,
    borderRadius: SCALE_28,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: spacing.CUSTOME_SCALE(16),
    paddingRight: spacing.CUSTOME_SCALE(24),
    paddingVertical: spacing.CUSTOME_SCALE(24),
    marginVertical: SCALE_4
  },
  iconStyle: {
    width: SCALE_34,
    height: SCALE_34,
    borderRadius: SCALE_12,
    backgroundColor: colors.primary.primary100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCALE_8
  },
  currencyStyle: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  footnoteBoldTextStyle: {
    fontWeight: '700',
    fontSize: FONT_SIZE_12,
    color: colors.natural.natural900
  },
  footnoteRedTextStyle: {
    color: colors.redPalette.red500
  },
  flatListStyle:{
    width:'100%'
  },
  suggestedStyle:{
    height:'auto'
  },
  listContainer:{
    marginVertical:SCALE_16
  },
  rearrangeContainerStyle:{
    justifyContent:'center',
    marginBottom:SCALE_12
  }
});

export default styles;
