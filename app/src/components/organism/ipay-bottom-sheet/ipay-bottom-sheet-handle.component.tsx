import { IPayBodyText, IPayLinerGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
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

      <IPayView style={styles.headerTitlesView}>
        <IPayButton onPress={onPressCancel}>
          <IPayBodyText color={colors.primary.primary500} regular>
            {localizationText.cancel}
          </IPayBodyText>
        </IPayButton>
        <IPaySubHeadlineText style={styles.titleText}>{localizationText.title}</IPaySubHeadlineText>
        <IPayButton onPress={onPressDone}>
          <IPayBodyText color={colors.primary.primary500} regular>
            {localizationText.done}
          </IPayBodyText>
        </IPayButton>
      </IPayView>
    </IPayLinerGradientView>
  );
};

export default IPayBottomSheetHandle;
