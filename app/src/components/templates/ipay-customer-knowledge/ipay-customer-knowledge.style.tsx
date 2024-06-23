import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';

const customerKnowledgeStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      aligItems: 'center',
      marginHorizontal: spacing.SCALE_24,
      marginTop: spacing.SCALE_12,
    },
    main: {
      flex: 1,
    },
    headingView: {
      width: spacing.CUSTOME_SCALE(297),
      paddingHorizontal: spacing.SCALE_48,
    },
    messageIconView: {
      marginTop: spacing.SCALE_24,
      marginBottom: spacing.SCALE_16,
      alignSelf: 'center',
    },
    timerText: {
      alignSelf: 'center',
      marginTop: spacing.SCALE_40,
      marginBottom: spacing.SCALE_8,
    },
    sendCodeBtnStyle: {
      marginBottom: spacing.SCALE_32,
    },
    otpView: {
      marginTop: spacing.SCALE_32,
    },
    customListStyle: {
      borderRadius: spacing.SCALE_22,
      borderWidth: 1,
      borderColor: colors.primary.primary100,
      paddingVertical: spacing.SCALE_4,
      marginBottom: spacing.CUSTOME_SCALE(12),
    },
    labelColor: {
      color: colors.natural.natural500,
      fontSize: spacing.CUSTOME_SCALE(15),
    },
    containerStyle: {
      paddingHorizontal: spacing.CUSTOME_SCALE(12),
    },
    heading: {
      fontSize: scaleFont(15),
      color: colors.natural.natural500,
      marginTop: spacing.CUSTOME_SCALE(20),
    },
    inputContainerStyle: {
      marginTop: spacing.CUSTOME_SCALE(12),
      paddingLeft: spacing.CUSTOME_SCALE(20),
      paddingRight: spacing.CUSTOME_SCALE(40),
      backgroundColor: colors.natural.natural0,
    },
    buttonWrapper: {
      marginTop: spacing.CUSTOME_SCALE(8),
      marginBottom: spacing.CUSTOME_SCALE(100),
    },
    listStyle: {
      marginBottom: spacing.CUSTOME_SCALE(8),
    },
    searchInputStyle: {
      height: spacing.CUSTOME_SCALE(36),
      marginBottom: spacing.CUSTOME_SCALE(24),
      backgroundColor: colors.natural.natural0,
    },
  });

export default customerKnowledgeStyles;
