import { IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayBottomSheetHandleProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';

const IPayBottomSheetHandle: React.FC<IPayBottomSheetHandleProps> = ({
  simpleHeader,
  heading,
  onPressCancel,
  onPressDone,
  simpleHeaderBar
}) => {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView style={styles.headerContainer}>
      {simpleHeader ? (
        <IPayView style={styles.simpleHeaderTitleView}>
          <IPayView style={styles.simpleHeaderBar} />

          <IPaySubHeadlineText style={styles.simpleTitleText}>{heading}</IPaySubHeadlineText>
        </IPayView>
      ) : (
        <>
          {simpleHeaderBar ? (
            <IPayView style={styles.simpleHeaderBar} />
          ) : (
            <IPayLinearGradientView
              locations={[0.1, 0.9]}
              style={styles.headerBar}
              gradientColors={colors.gradientPrimary}
            />
          )}
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
    </IPayView>
  );
};

export default IPayBottomSheetHandle;