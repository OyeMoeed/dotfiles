import { scaleSize, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';

const onboardingStyles = (colors: any) =>
  createStyleSheet({
    container: {
      width: SCREEN_WIDTH,
      height: '100%',
      paddingHorizontal: scaleSize(30),
    },
    headerStyles: {
      flex: 0.15,
      alignItems: 'center', // Center horizontally
      justifyContent: 'flex-end', // Center vertically
    },
    imageStyles: {
      paddingVertical: scaleSize(20),
      flex: 0.45,
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
    },
    innerImageStyles: {
      width: '100%', // Responsive width
      flex: 1,
      aspectRatio: scaleSize(0.6),
    },
    topMargins: {
      marginTop: scaleSize(10),
    },
    bottomButtonView: {
      flex: 0.4,
    },
    textContainer: {
      width: '100%',
      justifyContent: 'space-evenly',
      flex: 0.6,
      marginBottom: scaleSize(20),
    },
    title: {
      fontWeight: FONT_WEIGHT_BOLD,
      color: colors.natural.natural900,
      lineHeight: undefined,
    },
    subtitle: {
      color: colors.natural.natural900,
      width: scaleSize(275),
    },
    subtitleLeft: {
      textAlign: 'left',
    },
    buttonFlexBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    variant3: {
      width: '100%',
    },
    blackText: {
      color: colors.natural.natural1000,
    },
    nextButton: {
      backgroundColor: colors.natural.natural0,
      paddingHorizontal: scaleSize(24),
      paddingVertical: scaleSize(10),
      borderRadius: scaleSize(10),
    },

    absoulteStyle: { position: 'absolute' },
    lowOpacity: { opacity: 0.2 },
    back: {
      color: colors.natural.natural1000,
    },
    imageLogo: {
      width: scaleSize(108),
      height: scaleSize(32),
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
  });

export default onboardingStyles;
