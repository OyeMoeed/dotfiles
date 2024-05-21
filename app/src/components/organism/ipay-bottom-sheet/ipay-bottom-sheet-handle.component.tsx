import { IPayLinerGradientView, RNBodyText, RNSubHeadlineText, RNView } from '@app/components/atoms';
import { RNButton } from '@app/components/molecules';
import useLocalization from '@app/localization/localization.hook';
import useTheme from '@app/styles/theming/theme.hook';
import React from 'react';
import { IPayBottomSheetHandleProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';

const IPayBottomSheetHandle: React.FC<IPayBottomSheetHandleProps> = ({ onPressCancel, onPressDone }) => {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayLinerGradientView style={styles.headerContainer} gradientColors={colors.bottomsheetGradient}>
      <IPayLinerGradientView locations={[0.1, 0.9]} style={styles.headerBar} gradientColors={colors.gradient1} />

      <RNView style={styles.headerTitlesView}>
        <RNButton onPress={onPressCancel}>
          <RNBodyText color={colors.primary.primary500} regular>
            {localizationText.cancel}
          </RNBodyText>
        </RNButton>
        <RNSubHeadlineText style={styles.titleText}>{localizationText.title}</RNSubHeadlineText>
        <RNButton onPress={onPressDone}>
          <RNBodyText color={colors.primary.primary500} regular>
            {localizationText.done}
          </RNBodyText>
        </RNButton>
      </RNView>
    </IPayLinerGradientView>
  );
};

export default IPayBottomSheetHandle;
