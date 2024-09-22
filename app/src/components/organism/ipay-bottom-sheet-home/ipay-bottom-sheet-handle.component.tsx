import { IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { buttonVariants } from '@app/utilities';
import { IPayBottomSheetHandleProps } from './ipay-bottom-sheet-home.interface';
import bottonSheetStyles from './ipay-bottom-sheet-home.style';

const IPayBottomSheetHandle: React.FC<IPayBottomSheetHandleProps> = ({
  simpleHeader,
  heading,
  onPressCancel,
  onPressDone,
}) => {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);

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
              btnType={buttonVariants.LINK_BUTTON}
              medium
              btnIconsDisabled
              onPress={onPressCancel}
              btnText="COMMON.CANCEL"
            />

            <IPaySubHeadlineText style={styles.titleText} text={heading || 'COMMON.TITTLE'} />

            <IPayButton
              btnType={buttonVariants.LINK_BUTTON}
              medium
              btnIconsDisabled
              onPress={onPressDone}
              btnText="COMMON.DONE"
            />
          </IPayView>
        </>
      )}
    </IPayLinearGradientView>
  );
};

export default IPayBottomSheetHandle;
