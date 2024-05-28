import { IPayLinerGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
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
        <IPayButton
          btnType="link-button"
          medium
          btnIconsDisabled
          onPress={onPressCancel}
          btnText={localizationText.cancel}
        />

        <IPaySubHeadlineText style={styles.titleText}>{localizationText.title}</IPaySubHeadlineText>

        <IPayButton
          btnType="link-button"
          medium
          btnIconsDisabled
          onPress={onPressDone}
          btnText={localizationText.done}
        />
      </IPayView>
    </IPayLinerGradientView>
  );
};

export default IPayBottomSheetHandle;
