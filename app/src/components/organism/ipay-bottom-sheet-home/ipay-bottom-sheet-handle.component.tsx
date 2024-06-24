import { IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayBottomSheetHandleProps } from './ipay-bottom-sheet-home.interface';
import bottonSheetStyles from './ipay-bottom-sheet-home.style';

const IPayBottomSheetHandle: React.FC<IPayBottomSheetHandleProps> = ({
  simpleHeader,
  heading,
  onPressCancel,
  onPressDone
}) => {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayLinearGradientView style={styles.headerContainer} gradientColors={colors.bottomsheetGradient}>
      {simpleHeader ? (
        <IPayView style={styles.simpleHeaderTitleView}>
          <IPayView style={styles.simpleHeaderBar} />

          <IPaySubHeadlineText style={styles.simpleTitleText}>{heading}</IPaySubHeadlineText>
        </IPayView>
      ) : (
        <>
          <IPayLinearGradientView
            locations={[0.1, 0.9]}
            style={styles.headerBar}
            gradientColors={colors.gradientPrimary}
          />

          <IPayView style={styles.headerTitlesView}>
            <IPayButton
              btnType={'link-button'}
              medium
              btnIconsDisabled
              onPress={onPressCancel}
              btnText={localizationText.cancel}
            />

            <IPaySubHeadlineText style={styles.titleText}>{heading || localizationText.title}</IPaySubHeadlineText>

            <IPayButton
              btnType={'link-button'}
              medium
              btnIconsDisabled
              onPress={onPressDone}
              btnText={localizationText.done}
            />
          </IPayView>
        </>
      )}
    </IPayLinearGradientView>
  );
};

export default IPayBottomSheetHandle;
